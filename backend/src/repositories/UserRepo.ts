import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { checkNotNull } from "../core/utils/checkNotNull";
import { IUserSecure } from "../model/IUserSecure";
import { User } from "../model/User";
import { UserProfile } from "../model/UserProfile";
import { UserRole } from "../model/UserRole";
import { ICredentials } from "../shared/model/ICredentials";
import { IUser } from "../shared/model/IUser";
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
    let user: IUser | undefined = undefined;

    await transaction(async () => {
      // create user
      const userRepo = new UserRepo();
      user = await userRepo.createUser({
        username: entity.username,
        password: "initial",
      });

      // create profile
      const userProfileRepo = new UserProfileRepo();
      user.userProfile = await userProfileRepo.insert(
        checkNotNull(user.userProfile)
      );

      // create user roles
      const userRoleRepo = new UserRoleRepo();
      const userRole = await userRoleRepo.insert({
        role: AuthRole.USER,
        userId: user.id,
      });
      user.userRoles.push(userRole);
    });

    return user;
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
