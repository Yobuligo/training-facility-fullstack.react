import { IUserSecure } from "../model/IUserSecure";
import { User } from "../model/User";
import { ICredentials } from "../shared/model/ICredentials";
import { IUser } from "../shared/model/IUser";
import { hash } from "../utils/hash";
import { hashPassword } from "../utils/hashPassword";
import { uuid } from "../utils/uuid";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserRepo extends SequelizeRepository<IUserSecure> {
  constructor() {
    super(User);
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
