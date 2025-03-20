import { Transaction } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { checkNotNull } from "../core/utils/checkNotNull";
import { db } from "../db/db";
import { EventRegistration } from "../model/EventRegistration";
import { User } from "../model/User";
import { relHasOneUserProfile, UserProfile } from "../model/UserProfile";
import { IEventRegistration } from "../shared/model/IEventRegistration";
import { UserNotFoundError } from "./../shared/errors/UserNotFoundError";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class EventRegistrationRepo extends SequelizeRepository<IEventRegistration> {
  constructor() {
    super(EventRegistration, [
      {
        model: User,
        as: "user",
        include: [{ model: UserProfile, as: relHasOneUserProfile }],
      },
    ]);
  }

  async findByEventInstanceId(
    eventInstanceId: string
  ): Promise<IEventRegistration[]> {
    const data = await this.model.findAll({
      where: { eventInstanceId },
      include: [
        {
          model: User,
          as: "user",
          include: [{ model: UserProfile, as: relHasOneUserProfile }],
        },
      ],
    });
    return data.map((model) => model.toJSON());
  }

  insert<K extends keyof IEventRegistration>(
    entity: IEntityDetails<IEventRegistration>,
    fields: K[]
  ): Promise<IEntitySubset<IEventRegistration, K>>;
  insert(
    entity: IEntityDetails<IEventRegistration>
  ): Promise<IEventRegistration>;
  async insert(
    entity: IEntityDetails<IEventRegistration>,
    fields?: unknown
  ): Promise<unknown> {
    let entityRegistration: IEventRegistration | undefined = undefined;
    await db.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (transaction) => {
        // check if user still exists
        const user = await User.findByPk(entity.userId);
        if (!user) {
          throw new UserNotFoundError(
            "UserNotFoundError",
            "Error while register user. User does not exist anymore."
          );
        }

        // check if user is already registered
        const data = await this.model.findOne({
          where: {
            eventInstanceId: entity.eventInstanceId,
            userId: entity.userId,
          },
          transaction,
        });

        if (data) {
          entityRegistration = this.toJson(data, fields);
        } else {
          const data = await this.model.create(entity, { transaction });
          entityRegistration = this.toJson(data, fields);
        }
      }
    );
    return checkNotNull(entityRegistration);
  }
}
