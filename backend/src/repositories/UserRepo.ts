import { Op } from "sequelize";
import { AppConfig } from "../AppConfig";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { IllegalStateError } from "../core/errors/IllegalStateError";
import { DateTime } from "../core/services/date/DateTime";
import { checkNotNull } from "../core/utils/checkNotNull";
import { IUserSecure } from "../model/types/IUserSecure";
import { User } from "../model/User";
import { UserBankAccount } from "../model/UserBankAccount";
import { UserGrading } from "../model/UserGrading";
import { UserLoginAttempt } from "../model/UserLoginAttempt";
import { UserProfile } from "../model/UserProfile";
import { UserRole } from "../model/UserRole";
import { InvalidCredentialsError } from "../shared/errors/InvalidCredentialsError";
import { LoginNotPossibleError } from "../shared/errors/LoginNotPossibleError";
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
  constructor() {
    super(User, [
      { model: UserRole, as: "userRoles" },
      {
        model: UserProfile,
        as: "userProfile",
        include: [
          { model: UserBankAccount, as: "userBankAccount" },
          {
            model: UserGrading,
            as: "userGradings",
          },
        ],
      },
    ]);
  }

  async activate(userId: string): Promise<boolean> {
    const [updatedRows] = await this.model.update(
      { isDeactivated: false, deactivatedAt: undefined },
      { where: { id: userId } }
    );
    return updatedRows === 1;
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
      isDeactivated: false,
    });
    return user;
  }

  async deactivate(userId: string): Promise<boolean> {
    let updatedRows: [affectedCount: number] = [0];
    await transaction(async () => {
      // deactivate user
      updatedRows = await this.model.update(
        { isDeactivated: true, deactivatedAt: new Date() },
        { where: { id: userId } }
      );

      // delete user sessions
      const sessionRepo = new SessionRepo();
      await sessionRepo.deleteUserSession(userId);
    });

    return updatedRows[0] === 1;
  }

  findAllByQuery<K extends keyof IUser>(
    query: string,
    fields: K[]
  ): Promise<IEntitySubset<IUser, K>[]>;
  findAllByQuery(query: string): Promise<IUser[]>;
  async findAllByQuery(query: string, fields?: unknown): Promise<unknown> {
    const searchTerms = query.split(" ");

    const where = {
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

  async findByIdShort(userId: string): Promise<IUserShort | undefined> {
    const data = await User.findByPk(userId, {
      attributes: ["id", "isDeactivated", "username"],
      include: [
        {
          model: UserProfile,
          as: "userProfile",
          attributes: ["id", "firstname", "lastname", "email", "phone"],
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

  async findAllShort(): Promise<IUserShort[]> {
    const data = await User.findAll({
      attributes: ["id", "isDeactivated"],
      include: [
        {
          model: UserProfile,
          as: "userProfile",
          attributes: ["id", "firstname", "lastname", "email", "phone"],
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
        password: hash("initial"),
      });

      createdUser = {
        id: userSecure.id,
        username: userSecure.username,
        userRoles: [],
        isDeactivated: false,
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

  private checkUserLoginAttempt(user: IUserSecure) {
    // check if user has fail attempts, otherwise return
    if (!user.userLoginAttempt) {
      return;
    }

    // check if the user is below the number of allowed tries, which is fine
    if (
      user.userLoginAttempt.numberFailAttempts <
      AppConfig.userNumberAttemptsToTemporaryBlock
    ) {
      return;
    }

    // otherwise, check if the user is temporarily blocked
    if (
      user.userLoginAttempt.lockedUntil &&
      DateTime.isBefore(user.userLoginAttempt.lockedUntil)
    ) {
      throw new LoginNotPossibleError();
    }

    // finally check if the user is permanently locked
    if (
      user.userLoginAttempt.numberFailAttempts <
      AppConfig.userNumberAttemptsToPermanentlyLock
    ) {
      throw new LoginNotPossibleError();
    }
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

    this.checkUserLoginAttempt(user);

    const password = hashPassword(credentials.password, user.salt);
    if (password === user.password) {
      return user;
    }

    return undefined;
  }

  private async findByUsernameSecure(
    username: string
  ): Promise<IUserSecure | undefined> {
    const data = await this.model.findOne({
      where: { username },
      attributes: [
        "id",
        "isDeactivated",
        "deactivatedAt",
        "username",
        "password",
        "salt",
        "createdAt",
        "updatedAt",
      ],
      include: [UserLoginAttempt],
    });
    return data?.toJSON();
  }

  private toUserShort(model: User): IUserShort {
    const user = model.toJSON();
    return {
      id: user.id,
      email: user.userProfile?.email ?? "",
      firstname: user.userProfile?.firstname ?? "",
      isDeactivated: user.isDeactivated,
      lastname: user.userProfile?.lastname ?? "",
      userRoles:
        user.userRoles?.map((userRole) => ({
          id: userRole.id,
          role: userRole.role,
        })) ?? [],
      phone: user.userProfile?.phone,
      username: user.username,
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
}
