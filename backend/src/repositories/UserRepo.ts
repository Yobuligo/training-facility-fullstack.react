import { Op, WhereOptions } from "sequelize";
import { AppConfig } from "../AppConfig";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { IllegalStateError } from "../core/errors/IllegalStateError";
import { DateTime } from "../core/services/date/DateTime";
import { checkNotNull } from "../core/utils/checkNotNull";
import { IUserSecure } from "../model/types/IUserSecure";
import { User } from "../model/User";
import { UserBankAccount } from "../model/UserBankAccount";
import { UserContactOptions } from "../model/UserContactOptions";
import { UserGrading } from "../model/UserGrading";
import { UserGuardian } from "../model/UserGuardian";
import { UserLoginFailAttempt } from "../model/UserLoginFailAttempt";
import { UserProfile } from "../model/UserProfile";
import { UserRole } from "../model/UserRole";
import { UserLoginFailAttemptService } from "../services/UserLoginFailAttemptService";
import { InvalidCredentialsError } from "../shared/errors/InvalidCredentialsError";
import { NotFoundError } from "../shared/errors/NotFoundError";
import { IChangeCredentials } from "../shared/model/IChangeCredentials";
import { ICredentials } from "../shared/model/ICredentials";
import { IUser } from "../shared/model/IUser";
import { IUserProfile } from "../shared/model/IUserProfile";
import { IUserShort } from "../shared/model/IUserShort";
import { AuthRole } from "../shared/types/AuthRole";
import { hash } from "../utils/hash";
import { hashPassword } from "../utils/hashPassword";
import { uuid } from "../utils/uuid";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";
import { findTransaction } from "./sequelize/utils/findTransaction";
import { transaction } from "./sequelize/utils/transaction";
import { SessionRepo } from "./SessionRepo";
import { UserProfileRepo } from "./UserProfileRepo";
import { UserRoleRepo } from "./UserRoleRepo";

export class UserRepo extends SequelizeRepository<IUserSecure> {
  private userProfileShortAttributes: (keyof IUserShort)[] = [
    "id",
    "birthday",
    "firstname",
    "lastname",
    "email",
    "phone",
    "resignedAt",
  ];

  constructor() {
    super(User, [
      { model: UserRole, as: "userRoles" },
      {
        model: UserProfile,
        as: "userProfile",
        include: [
          { model: UserBankAccount, as: "userBankAccount" },
          { model: UserContactOptions, as: "userContactOptions" },
          { model: UserGrading, as: "userGradings" },
          { model: UserGuardian, as: "userGuardians" },
        ],
      },
    ]);
  }

  async changePassword(
    userId: string,
    changeCredentials: IChangeCredentials
  ): Promise<boolean> {
    const user = await this.findByCredentials(changeCredentials);
    if (!user) {
      throw new InvalidCredentialsError("InvalidCredentialsError");
    }

    // do we check credentials for different user?
    if (user.id !== userId) {
      throw new IllegalStateError(
        "Error during changing password. The parameter `userId` does not match the user credentials."
      );
    }

    const wasUpdated = this.updatePassword(
      user.id,
      changeCredentials.newPassword
    );
    return wasUpdated;
  }

  async createUser(credentials: ICredentials): Promise<IUserSecure> {
    const salt = this.createSalt();
    const password = hashPassword(credentials.password, salt);

    const user = await super.insert({
      password,
      salt,
      username: credentials.username,
      userRoles: [],
      isLocked: false,
    });
    return user;
  }

  async lock(userId: string): Promise<boolean> {
    let updatedRows: [affectedCount: number] = [0];
    await transaction(async () => {
      // lock user
      updatedRows = await this.model.update(
        { isLocked: true, lockedAt: new Date() },
        { where: { id: userId } }
      );

      // delete user sessions
      const sessionRepo = new SessionRepo();
      await sessionRepo.deleteByUserId(userId);
    });

    return updatedRows[0] === 1;
  }

  findAllByQuery<K extends keyof IUser>(
    query: string,
    excludeResigned: boolean,
    fields: K[]
  ): Promise<IEntitySubset<IUser, K>[]>;
  findAllByQuery(query: string, excludeResigned: boolean): Promise<IUser[]>;
  async findAllByQuery(
    query: string,
    excludeResigned: boolean,
    fields?: unknown
  ): Promise<unknown> {
    let where: WhereOptions<any> = {};

    // select all data? Exclude resigned users?
    if (query === "*") {
      if (excludeResigned) {
        where = {
          resignedAt: { [Op.eq]: null },
        };
      }
    } else {
      const searchTerms = query.split(" ");

      where = {
        [Op.or]: searchTerms.map((term) => ({
          [Op.or]: [
            {
              firstname: {
                [Op.like]: `%${term}%`,
              },
            },
            {
              lastname: {
                [Op.like]: `%${term}%`,
              },
            },
          ],
        })),
      };

      if (excludeResigned) {
        where = {
          [Op.and]: [{ resignedAt: { [Op.eq]: null } }, where],
        };
      }
    }

    const data = await this.model.findAll({
      include: [{ model: UserProfile, as: "userProfile", where }],
    });

    let users = data.map((model) => model.toJSON());
    users = this.restrictEntitiesFields(users, fields);
    return users;
  }

  async findByCredentials(
    credentials: ICredentials
  ): Promise<IUser | undefined> {
    return this.findByCredentialsSecure(credentials);
  }

  async findByUsername(username: string): Promise<IUser | undefined> {
    const data = await this.model.findOne({ where: { username } });
    return data?.toJSON();
  }

  async findAllShort(userIds?: string[]): Promise<IUserShort[]> {
    let where: WhereOptions<IUserSecure> | undefined;
    if (userIds) {
      where = { id: { [Op.in]: userIds } };
    }

    const data = await User.findAll({
      attributes: ["id", "isLocked", "username"],
      where,
      include: [
        {
          model: UserProfile,
          as: "userProfile",
          attributes: this.userProfileShortAttributes,
        },
        {
          model: UserRole,
          as: "userRoles",
          attributes: ["id", "role"],
        },
      ],
      transaction: findTransaction(),
    });

    const userShorts: IUserShort[] = data.map((model) =>
      this.toUserShort(model)
    );
    return userShorts;
  }

  /**
   * Returns all users in a short format having a specific role, e.g. ADMIN or TRAINER.
   * Attention: Returns only the role to which is restricted not all rules of a user.
   */
  async findAllShortByRole(role: AuthRole): Promise<IUserShort[]> {
    const data = await User.findAll({
      attributes: ["id", "isLocked", "username"],
      include: [
        {
          model: UserProfile,
          as: "userProfile",
          attributes: this.userProfileShortAttributes,
        },
        {
          model: UserRole,
          as: "userRoles",
          attributes: ["id", "role"],
          where: {
            role: role,
          },
        },
      ],
    });

    const userShorts: IUserShort[] = data.map((model) =>
      this.toUserShort(model)
    );
    return userShorts;
  }

  async findByIdShort(userId: string): Promise<IUserShort | undefined> {
    const data = await User.findByPk(userId, {
      attributes: ["id", "isLocked", "username"],
      include: [
        {
          model: UserProfile,
          as: "userProfile",
          attributes: this.userProfileShortAttributes,
        },
        {
          model: UserRole,
          as: "userRoles",
          attributes: ["id", "role"],
        },
      ],
    });

    if (!data) {
      return undefined;
    }

    return this.toUserShort(data);
  }

  async existsById(userId: string): Promise<boolean> {
    const data = await this.model.findByPk(userId, {
      attributes: ["id"],
    });

    if (data) {
      return true;
    } else {
      return false;
    }
  }

  async existsByUsername(username: string): Promise<boolean> {
    const data = await this.model.findOne({
      where: { username },
      attributes: ["id"],
    });

    if (data) {
      return true;
    } else {
      return false;
    }
  }

  insert<K extends keyof IUserSecure>(
    entity: IEntityDetails<IUserSecure>,
    fields: K[]
  ): Promise<IEntitySubset<IUserSecure, K>>;
  insert(entity: IEntityDetails<IUserSecure>): Promise<IUserSecure>;
  async insert(
    entity: IEntityDetails<IUserSecure>,
    fields?: unknown
  ): Promise<unknown> {
    let createdUser: IUser | undefined = undefined;

    await transaction(async () => {
      // create User
      const userSecure = await this.createUser({
        username: entity.username,
        password: hash(uuid()),
      });

      createdUser = {
        id: userSecure.id,
        username: userSecure.username,
        userRoles: [],
        isLocked: false,
        createdAt: userSecure.createdAt,
        updatedAt: userSecure.updatedAt,
      };

      // create UserProfile
      const userProfile: IUserProfile = checkNotNull(entity.userProfile);
      userProfile.userId = createdUser.id;
      const userProfileRepo = new UserProfileRepo();
      createdUser.userProfile = await userProfileRepo.insert(userProfile);

      // create UserRoles
      if (!createdUser.userRoles) {
        createdUser.userRoles = [];
      }

      const userRoleRepo = new UserRoleRepo();
      const userRole = await userRoleRepo.insert({
        role: AuthRole.USER,
        userId: createdUser.id,
      });
      createdUser.userRoles.push(userRole);

      if (entity.userRoles) {
        // find user roles beside "USER", which must be assigned
        const newUserRoles = entity.userRoles.filter(
          (userRole) => userRole.role !== AuthRole.USER
        );
        for (let i = 0; i < newUserRoles.length; i++) {
          await userRoleRepo.insert({
            role: newUserRoles[i].role,
            userId: createdUser.id,
          });
        }
      }
    });

    return createdUser;
  }

  async setPassword(userId: string, newPassword: string): Promise<boolean> {
    if (!(await this.existsById(userId))) {
      throw new NotFoundError(
        "NotFoundError",
        "Error while finding user by user id. User not found."
      );
    }
    const wasChanged = await this.updatePassword(userId, newPassword);
    return wasChanged;
  }

  async unlock(userId: string): Promise<boolean> {
    let wasUpdated = false;
    transaction(async () => {
      // unlock user and delete user login fail attempts
      const [updatedRows] = await this.model.update(
        { isLocked: false, lockedAt: undefined },
        { where: { id: userId } }
      );
      wasUpdated = updatedRows === 1;
      await UserLoginFailAttempt.destroy({ where: { userId: userId } });
    });
    return wasUpdated;
  }

  async update(entity: IUserSecure): Promise<boolean> {
    let wasUpdated = false;
    await transaction(async () => {
      // update User
      wasUpdated = await super.update(entity);

      // update UserProfile
      if (entity.userProfile) {
        const userProfileRepo = new UserProfileRepo();
        await userProfileRepo.update(entity.userProfile);
      }

      // Synchronize (insert, update, delete) UserRoles
      if (entity.userRoles) {
        // update user id
        entity.userRoles.forEach((userRole) => userRole.userId === entity.id);
        const userRoleRepo = new UserRoleRepo();
        userRoleRepo.synchronize(entity.userRoles, { userId: entity.id });
      }
    });
    return wasUpdated;
  }

  private createSalt(): string {
    return hash(uuid());
  }

  private async findByCredentialsSecure(
    credentials: ICredentials
  ): Promise<IUserSecure | undefined> {
    const user = await this.findByUsernameSecure(credentials.username);
    if (!user) {
      return undefined;
    }

    const userLoginFailAttemptService = new UserLoginFailAttemptService();
    userLoginFailAttemptService.check(user.userLoginFailAttempt);

    const password = hashPassword(credentials.password, user.salt);
    if (password === user.password) {
      await this.deleteUserLoginFailAttempt(user);
      return user;
    }

    await this.updateUserLoginFailAttempt(user);
    return undefined;
  }

  private async findByUsernameSecure(
    username: string
  ): Promise<IUserSecure | undefined> {
    const data = await this.model.findOne({
      where: { username },
      attributes: [
        "id",
        "isLocked",
        "lockedAt",
        "username",
        "password",
        "salt",
        "createdAt",
        "updatedAt",
      ],
      include: [{ as: "userLoginFailAttempt", model: UserLoginFailAttempt }],
    });
    return data?.toJSON();
  }

  /**
   * Deletes login fail attempts of a user.
   */
  private async deleteUserLoginFailAttempt(user: IUserSecure) {
    if (!user.userLoginFailAttempt) {
      return;
    }
    await UserLoginFailAttempt.destroy({
      where: { userId: user.id },
      transaction: findTransaction(),
    });
  }

  private toUserShort(model: User): IUserShort {
    const user = model.toJSON();
    return {
      id: user.id,
      birthday: user.userProfile?.birthday,
      email: user.userProfile?.email ?? "",
      firstname: user.userProfile?.firstname ?? "",
      isLocked: user.isLocked,
      lastname: user.userProfile?.lastname ?? "",
      userRoles:
        user.userRoles?.map((userRole) => ({
          id: userRole.id,
          role: userRole.role,
        })) ?? [],
      phone: user.userProfile?.phone,
      username: user.username,
      resignedAt: user.userProfile?.resignedAt,
    };
  }

  private async updatePassword(
    userId: string,
    newPassword: string
  ): Promise<boolean> {
    const salt = this.createSalt();
    const password = hashPassword(newPassword, salt);
    const updatedRows = await this.model.update(
      { password, salt },
      { where: { id: userId } }
    );
    return updatedRows[0] === 1;
  }

  private async updateUserLoginFailAttempt(user: IUserSecure) {
    // first fail attempt? Create entry
    if (!user.userLoginFailAttempt) {
      return await UserLoginFailAttempt.create({
        lastFailAttempt: new Date(),
        numberFailAttempts: 1,
        userId: user.id,
      });
    }

    const numberFailAttempts = user.userLoginFailAttempt.numberFailAttempts + 1;

    let lockedUntil: Date | undefined = undefined;
    if (numberFailAttempts === AppConfig.userNumberAttemptsToTemporaryBlock) {
      lockedUntil = DateTime.addMinutes(
        new Date(),
        AppConfig.userTemporaryBlockInMinutes
      );
    }

    await UserLoginFailAttempt.update(
      {
        lastFailAttempt: new Date(),
        numberFailAttempts,
        lockedUntil,
      },
      { where: { userId: user.id }, transaction: findTransaction() }
    );

    // lock user if max fail attempts are reached
    if (numberFailAttempts === AppConfig.userNumberAttemptsToPermanentlyLock) {
      await this.lock(user.id);
    }
  }
}
