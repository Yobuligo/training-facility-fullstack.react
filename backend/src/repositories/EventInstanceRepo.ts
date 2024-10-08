import { Op, Transaction } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { checkNotNull } from "../core/utils/checkNotNull";
import { db } from "../db/db";
import { EventInstance } from "../model/EventInstance";
import { EventRegistration } from "../model/EventRegistration";
import { UserTrialTraining } from "../model/UserTrialTraining";
import { IEventInstance } from "../shared/model/IEventInstance";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class EventInstanceRepo extends SequelizeRepository<IEventInstance> {
  constructor() {
    super(EventInstance, [
      { model: EventRegistration, as: "eventRegistrations" },
      { model: UserTrialTraining, as: "userTrialTrainings" },
    ]);
  }

  async findByDateTimeSpanAndUser(
    dateTimeSpan: IDateTimeSpan,
    userId: string,
    fields: (keyof IEventInstance)[]
  ): Promise<IEventInstance[]> {
    const data = await this.model.findAll({
      where: {
        from: { [Op.gte]: dateTimeSpan.from },
        to: { [Op.lte]: dateTimeSpan.to },
      },
      attributes: this.getAttributes(fields),
      include: [
        {
          model: EventRegistration,
          as: "eventRegistrations",
          where: {
            userId: userId,
          },
        },
        { model: UserTrialTraining, as: "userTrialTrainings" },
      ],
    });

    let eventInstances = data.map((model) => model.toJSON());
    eventInstances = this.restrictEntitiesFields(eventInstances, fields);
    return eventInstances;
  }

  insert<K extends keyof IEventInstance>(
    entity: IEntityDetails<IEventInstance>,
    fields: K[]
  ): Promise<IEntitySubset<IEventInstance, K>>;
  insert(entity: IEntityDetails<IEventInstance>): Promise<IEventInstance>;
  async insert(
    entity: IEntityDetails<IEventInstance>,
    fields?: unknown
  ): Promise<unknown> {
    // when inserting an eventInstance for an event definition for a specific time, we have to ensure that this instance exists only once (Race condition)
    let eventInstance: IEventInstance | undefined = undefined;
    await db.transaction(
      { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
      async (transaction) => {
        // check if event instance was already created
        const data = await this.model.findOne({
          where: {
            eventDefinitionId: entity.eventDefinitionId,
            from: entity.from,
            to: entity.to,
          },
          include: this.getIncludes(fields),
          transaction,
        });

        if (data) {
          eventInstance = this.toJson(data, fields);
        } else {
          const data = await this.model.create(entity, { transaction });
          eventInstance = this.toJson(data, fields);
        }
      }
    );
    return checkNotNull(eventInstance);
  }
}
