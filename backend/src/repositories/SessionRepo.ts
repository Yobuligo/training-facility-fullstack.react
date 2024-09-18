import { AppConfig } from "../AppConfig";
import { DateTime } from "../core/services/date/DateTime";
import { checkNotNull } from "../core/utils/checkNotNull";
import { Session } from "../model/Session";
import { ISession } from "../model/types/ISession";
import { IUser } from "../shared/model/IUser";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";
import { findTransaction } from "./sequelize/utils/findTransaction";

export class SessionRepo extends SequelizeRepository<ISession> {
  constructor() {
    super(Session);
  }

  async createUserSession(user: IUser, sessionId: string): Promise<ISession> {
    await this.deleteUserSession(user.id);
    const data = await Session.create(
      {
        id: sessionId,
        expiresAt: DateTime.addHours(
          new Date(),
          parseInt(checkNotNull(AppConfig.serverSessionExpirationInHours))
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id,
      },
      { transaction: findTransaction() }
    );
    return data.toJSON();
  }

  async deleteSession(session: ISession): Promise<boolean> {
    return await this.deleteUserSession(session.userId);
  }

  async deleteUserSession(userId: string) {
    const count = await this.model.destroy({
      where: { userId },
      transaction: findTransaction(),
    });
    return count > 0;
  }
}
