import { IUserSecure } from "../model/IUserSecure";
import { User } from "../model/User";
import { UserProfile } from "../model/UserProfile";
import { UserRole } from "../model/UserRole";
import { ICredentials } from "../shared/model/ICredentials";
import { IUser } from "../shared/model/IUser";
import { hash } from "../utils/hash";
import { hashPassword } from "../utils/hashPassword";
import { uuid } from "../utils/uuid";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

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

    const user = await this.insert({
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

  // insert<K extends keyof IUserSecure>(
  //   entity: IEntityDetails<IUserSecure>,
  //   fields: K[]
  // ): Promise<IEntitySubset<IUserSecure, K>>;
  // insert(entity: IEntityDetails<IUserSecure>): Promise<IUserSecure>;
  // async insert(
  //   entity: IEntityDetails<IUserSecure>,
  //   fields?: unknown
  // ): Promise<unknown> {
  //   const transaction = await db.transaction();
  //   try {
  //     // create user
  //     const userRepo = new UserRepo();
  //     const user = await userRepo.createUser({
  //       username: entity.username,
  //       password: "initial",
  //     });

  //     // create profile
  //     const userProfileRepo = new UserProfileRepo();
  //     const userProfile = await userProfileRepo.insert(
  //       checkNotNull(user.userProfile)
  //     );

  //     // create user roles
  //     const userRoleRepo = new UserRoleRepo();
  //     await userRoleRepo.insert({ role: AuthRole.USER, userId: user.id });
  //     return userProfile;
  //   } catch (error) {
  //     transaction.rollback();
  //     throw error;
  //   }
  // }

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
