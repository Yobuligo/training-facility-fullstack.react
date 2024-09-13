import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { DateTime } from "../core/services/date/DateTime";
import { User } from "../model/User";
import { UserInvite } from "../model/UserInvite";
import { ExpiredError } from "../shared/errors/ExpiredError";
import { NotFoundError } from "../shared/errors/NotFoundError";
import { IUserInvite } from "../shared/model/IUserInvite";
import { IUserInviteShort } from "../shared/model/IUserInviteShort";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";
import { findTransaction } from "./sequelize/utils/findTransaction";
import { transaction } from "./sequelize/utils/transaction";

export class UserInviteRepo extends SequelizeRepository<IUserInvite> {
  constructor() {
    super(UserInvite);
  }

  /**
   * Deletes all user invites by user id
   */
  async deleteByUserId(userId: string): Promise<boolean> {
    const rows = await this.model.destroy({
      where: { userId },
      transaction: findTransaction(),
    });
    return rows > 0;
  }

  insert<K extends keyof IUserInvite>(
    entity: IEntityDetails<IUserInvite>,
    fields: K[]
  ): Promise<IEntitySubset<IUserInvite, K>>;
  insert(entity: IEntityDetails<IUserInvite>): Promise<IUserInvite>;
  async insert(
    entity: IEntityDetails<IUserInvite>,
    fields?: unknown
  ): Promise<unknown> {
    let userInvite: IUserInvite | undefined = undefined;
    await transaction(async () => {
      await this.deleteByUserId(entity.userId);
      userInvite = await super.insert(entity, fields as (keyof IUserInvite)[]);
    });

    return userInvite;
  }

  async verify(userInviteId: string): Promise<IUserInviteShort> {
    const data = await this.model.findByPk(userInviteId, {
      include: [{ as: "user", model: User }],
    });
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
    return {
      id: userInvite.id,
      type: userInvite.type,
      userId: userInvite.userId,
      username: (userInvite as any).user.username,
    };
  }
}
