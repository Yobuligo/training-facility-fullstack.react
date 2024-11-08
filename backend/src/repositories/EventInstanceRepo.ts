import sequelize, { Transaction } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { checkNotNull } from "../core/utils/checkNotNull";
import { db } from "../db/db";
import { EventInstance } from "../model/EventInstance";
import { EventInstanceTrainer } from "../model/EventInstanceTrainer";
import { EventRegistration } from "../model/EventRegistration";
import { UserTrialTraining } from "../model/UserTrialTraining";
import { IEventInstance } from "../shared/model/IEventInstance";
import { IEventInstanceItemModelAndRole } from "../shared/model/IEventInstanceItemModelAndRole";
import { IEventInstanceTrainer } from "../shared/model/IEventInstanceTrainer";
import { IUserShort } from "../shared/model/IUserShort";
import { ITrainer } from "../shared/types/ITrainer";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";
import { findTrainers } from "./utils/findTrainers";

export class EventInstanceRepo extends SequelizeRepository<IEventInstance> {
  constructor() {
    super(EventInstance, [
      { model: EventRegistration, as: "eventRegistrations" },
      { model: UserTrialTraining, as: "userTrialTrainings" },
    ]);
  }

  async findByDateTimeSpanAndUser(
    dateTimeSpan: IDateTimeSpan,
    userId: string
  ): Promise<IEventInstanceItemModelAndRole[]> {
    const eventInstanceAndRoles =
      await this.selectEventInstancesBySDateTimeSpan(dateTimeSpan, userId);
    return eventInstanceAndRoles;
  }

  /**
   * Returns the possible trainers for an event instance by the given {@link eventInstanceId}.
   * This means all user having the role TRAINER, but also users, which might be assigned but haven't have the trainer role anymore.
   */
  async findTrainers(eventInstanceId: string): Promise<IUserShort[]> {
    // find trainers assigned to the event instance
    const data = await EventInstanceTrainer.findAll({
      where: { eventInstanceId },
    });
    const assignedTrainers = data.map((model) => model.toJSON());

    const trainers = await findTrainers(assignedTrainers);
    return trainers;
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
          eventInstance.trainers = entity.trainers;
          await this.synchronizeTrainers(
            eventInstance.id,
            transaction,
            entity.trainers
          );
        } else {
          const data = await this.model.create(entity, { transaction });
          eventInstance = this.toJson(data, fields);
          eventInstance.trainers = entity.trainers;
          await this.synchronizeTrainers(
            eventInstance.id,
            transaction,
            entity.trainers
          );
        }
      }
    );
    return checkNotNull(eventInstance);
  }

  async updateTrainers(
    eventInstanceId: string,
    trainers: ITrainer[]
  ): Promise<void> {
    await db.transaction(async (transaction) => {
      await this.synchronizeTrainers(eventInstanceId, transaction, trainers);
    });
  }

  private async selectEventInstancesBySDateTimeSpan(
    dateTimeSpan: IDateTimeSpan,
    userId: string
  ): Promise<IEventInstanceItemModelAndRole[]> {
    const query = `
      SELECT
        inst.id AS inst_id,
        inst.calledOff as inst_called_off,
        inst.color AS inst_color,
        inst.\`description\` AS inst_description,
        inst.\`from\` AS inst_from,
        inst.state AS inst_state,
        inst.title AS inst_title,
        inst.\`to\` AS inst_to,
        inst.createdAt AS inst_createdAt,
        inst.updatedAt AS inst_updatedAt,
        inst.eventDefinitionId AS inst_eventDefinitionId,
        reg.id AS reg_id
      FROM \`event-instances\` AS inst
      LEFT JOIN \`event-registrations\` AS reg
      ON reg.eventInstanceId = inst.id
      WHERE (
          inst.id IN (
            SELECT eventInstanceId 
            FROM \`event-instances-trainers\`
            WHERE userId = :userId
          ) OR reg.userId = :userId
        ) 
        AND inst.\`from\` >= DATE(:from)
        AND inst.to <= DATE(:to)
    `;

    const data = await db.query(query, {
      replacements: {
        from: dateTimeSpan.from,
        to: dateTimeSpan.to,
        userId: userId,
      },
      type: sequelize.QueryTypes.SELECT,
    });
    return this.convertToEventInstance(data);
  }

  private convertToEventInstance(
    data: any[]
  ): IEventInstanceItemModelAndRole[] {
    const eventInstanceAndRoles: any = {};

    data.forEach((row) => {
      const rowAny: any = row;
      if (!eventInstanceAndRoles[row.inst_id]) {
        const eventInstanceAndRole: IEventInstanceItemModelAndRole = {
          id: row.inst_id,
          calledOff: row.inst_called_off,
          color: row.inst_color,
          description: row.inst_description,
          from: row.inst_from,
          isCurrentUserTrainer: rowAny.reg_id !== null ? false : true,
          title: row.inst_title,
          to: row.inst_to,
          isMemberOnly: false,
        };
        eventInstanceAndRoles[row.inst_id] = eventInstanceAndRole;
      }
    });
    return Object.values(eventInstanceAndRoles);
  }

  private async synchronizeTrainers(
    eventInstanceId: string,
    transaction?: Transaction,
    trainers?: ITrainer[]
  ) {
    // Delete all existing trainer relations for this EventInstance
    await EventInstanceTrainer.destroy({
      where: { eventInstanceId: eventInstanceId },
      transaction,
    });

    // Add all currently set trainer relations
    const eventInstanceTrainers: sequelize.Optional<
      IEventInstanceTrainer,
      never
    >[] =
      trainers?.map((trainer) => ({
        eventInstanceId: eventInstanceId,
        userId: trainer.id,
      })) ?? [];
    await EventInstanceTrainer.bulkCreate(eventInstanceTrainers, {
      transaction,
    });
  }
}
