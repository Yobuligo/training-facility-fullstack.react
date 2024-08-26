import { IUser } from "../model/IUser";
import { User } from "../model/User";
import { ICredentials } from "../shared/model/ICredentials";
import { hash } from "../utils/hash";
import { hashPassword } from "../utils/hashPassword";
import { uuid } from "../utils/uuid";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserRepo extends SequelizeRepository<IUser> {
  constructor() {
    super(User);
  }

  async createUser(credentials: ICredentials): Promise<IUser> {
    const salt = hash(uuid());
    const password = hashPassword(credentials.password, salt);

    const user = await this.insert({
      password,
      salt,
      username: credentials.username,
    });
    return user;
  }

  async findByCredentials(
    credentials: ICredentials
  ): Promise<IUser | undefined> {
    const user = await this.findByUsername(credentials.username);
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
}
