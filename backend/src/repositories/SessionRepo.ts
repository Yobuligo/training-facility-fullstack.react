import { DateTime } from "../core/services/date/DateTime";
import { IUser } from "../model/IUser";
import { Session } from "../model/Session";
import { ISession } from "../shared/model/ISession";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class SessionRepo extends SequelizeRepository<ISession> {
  constructor() {
    super(Session);
  }

  async createUserSession(user: IUser): Promise<ISession> {
    await this.deleteUserSession(user.id);
    const session = await this.insert({
      expiresAt: DateTime.addHours(new Date(), 24),
      userId: user.id,
    });

    return session;
  }

  async deleteSession(session: ISession): Promise<boolean> {
    return await this.deleteUserSession(session.userId);
  }

  async deleteUserSession(userId: string) {
    const count = await this.model.destroy({ where: { userId } });
    return count > 0;
  }
}
