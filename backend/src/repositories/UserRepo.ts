import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { checkNotNull } from "../core/utils/checkNotNull";
import { IUserSecure } from "../model/IUserSecure";
import { User } from "../model/User";
import { UserProfile } from "../model/UserProfile";
import { UserRole } from "../model/UserRole";
import { ICredentials } from "../shared/model/ICredentials";
import { IUser } from "../shared/model/IUser";
import { IUserProfile } from "../shared/model/IUserProfile";
import { AuthRole } from "../shared/types/AuthRole";
import { hash } from "../utils/hash";
import { hashPassword } from "../utils/hashPassword";
import { uuid } from "../utils/uuid";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";
import { transaction } from "./sequelize/utils/transaction";
import { UserProfileRepo } from "./UserProfileRepo";
import { UserRoleRepo } from "./UserRoleRepo";

export class UserRepo extends SequelizeRepository<IUserSecure> {
  constructor() {
    super(User, [
      { model: UserRole, as: "userRoles" },
      { model: UserProfile, as: "userProfile" },
    ]);
  }

  async createUser(credentials: ICredentials): Promise<IUserSecure> {
    const salt = hash(uuid());
    const password = hashPassword(credentials.password, salt);

    const user = await super.insert({
      password,
      salt,
      username: credentials.username,
      userRoles: [],
    });
    return user;
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

    await transaction(async (transaction) => {
      // create user
      const userSecure = await this.createUser({
        username: entity.username,
        password: "initial",
      });

      createdUser = {
        id: userSecure.id,
        username: userSecure.username,
        userRoles: [],
        createdAt: userSecure.createdAt,
        updatedAt: userSecure.updatedAt,
      };

      // create profile
      const userProfile: IUserProfile = checkNotNull(entity.userProfile);
      userProfile.userId = createdUser.id;
      const userProfileRepo = new UserProfileRepo();
      createdUser.userProfile = await userProfileRepo.insert(userProfile);

      // create user roles
      const userRoleRepo = new UserRoleRepo();
      const userRole = await userRoleRepo.insert({
        role: AuthRole.USER,
        userId: createdUser.id,
      });
      createdUser.userRoles.push(userRole);
      await transaction.commit();
    });

    return createdUser;
  }

  private async findByUsernameSecure(
    username: string
  ): Promise<IUserSecure | undefined> {
    const data = await this.model.findOne({
      where: { username },
      attributes: [
        "id",
        "createdAt",
        "updatedAt",
        "username",
        "password",
        "salt",
      ],
    });
    return data?.toJSON();
  }
}
