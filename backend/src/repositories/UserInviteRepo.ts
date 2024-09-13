import { DateTime } from "../core/services/date/DateTime";
import { UserInvite } from "../model/UserInvite";
import { ExpiredError } from "../shared/errors/ExpiredError";
import { NotFoundError } from "../shared/errors/NotFoundError";
import { IUserInvite } from "../shared/model/IUserInvite";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserInviteRepo extends SequelizeRepository<IUserInvite> {
  constructor() {
    super(UserInvite);
  }

  async verify(userInviteId: string): Promise<IUserInvite> {
    const data = await this.model.findByPk(userInviteId);
    if (!data) {
      throw new NotFoundError(
        "NotFoundError",
        "Error while verifying user invite. Invite not found."
      );
    }

    const userInvite = data.toJSON();
    if (DateTime.isBefore(userInvite.expiresAt)) {
      throw new ExpiredError(
        "ExpiredError",
        "Error while verifying user invite. Invite has already expired"
      );
    }
    return userInvite;
  }
}
