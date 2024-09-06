import { Op } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { checkNotNull } from "../core/utils/checkNotNull";
import { IUserSecure } from "../model/IUserSecure";
import { User } from "../model/User";
import { UserBankAccount } from "../model/UserBankAccount";
import { UserGrading } from "../model/UserGrading";
import { UserProfile } from "../model/UserProfile";
import { UserRole } from "../model/UserRole";
import { ICredentials } from "../shared/model/ICredentials";
import { IUser } from "../shared/model/IUser";
import { IUserProfile } from "../shared/model/IUserProfile";
import { IUserRole } from "../shared/model/IUserRole";
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

  async createUser(credentials: ICredentials): Promise<IUserSecure> {
    const salt = hash(uuid());
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
    const user = await this.findByUsernameSecure(credentials.username);
    if (!user) {
      return undefined;
    }

    const password = hashPassword(credentials.password, user.salt);
    if (password === user.password) {
      return user;
    }

    return undefined;
  }

  async findByUsername(username: string): Promise<IUser | undefined> {
    const data = await this.model.findOne({ where: { username } });
    return data?.toJSON();
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

    const userShorts: IUserShort[] = data.map((model) => {
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
      };
    });
    return userShorts;
  }

  async existsByUsername(username: string): Promise<boolean> {
    const data = await this.model.findOne({
      where: { username },
      attributes: ["id"],
    });

    const entity = data?.toJSON();
    if (entity) {
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
        password: "initial",
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

      // update UserRoles
      const data = await UserRole.findAll({
        where: { userId: entity.id },
      });
      const dbUserRoles = data.map((model) => model.toJSON());

      await this.addNewUserRoles(entity, dbUserRoles);
      await this.deleteObsoleteUserRoles(dbUserRoles, entity);
    });
    return wasUpdated;
  }

  /**
   * Find user roles, which are persisted but no longer assigned to the user and delete them
   */
  private async deleteObsoleteUserRoles(
    dbUserRoles: IUserRole[],
    entity: IUserSecure
  ) {
    const deleteUserRoles = dbUserRoles.filter(async (userRole) => {
      const index = entity.userRoles?.findIndex(
        (item) => item.role === userRole.role
      );
      return index === -1;
    });

    for (let i = 0; i < deleteUserRoles.length; i++) {
      await UserRole.destroy({
        where: { id: deleteUserRoles[i].id },
        transaction: findTransaction(),
      });
    }
  }

  /**
   * Find user roles, which are not persisted yet and add them
   */
  private async addNewUserRoles(entity: IUserSecure, dbUserRoles: IUserRole[]) {
    const newUserRoles = entity.userRoles?.filter(async (userRole) => {
      const index = dbUserRoles.findIndex(
        (item) => item.role === userRole.role
      );
      return index === -1;
    });

    if (newUserRoles) {
      for (let i = 0; i < newUserRoles.length; i++) {
        await UserRole.create(
          {
            role: newUserRoles[i].role,
            userId: newUserRoles[i].userId,
          },
          {
            transaction: findTransaction(),
          }
        );
      }
    }
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
    });
    return data?.toJSON();
  }
}
