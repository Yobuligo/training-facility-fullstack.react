import sequelize from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { db } from "../db/db";
import { EventDefinitionTrainer } from "../model/EventDefinitionTrainer";
import { IEventDefinition } from "../shared/model/IEventDefinition";
import { IEventDefinitionTrainer } from "../shared/model/IEventDefinitionTrainer";
import { IEventInstance } from "../shared/model/IEventInstance";
import { IEventRegistration } from "../shared/model/IEventRegistration";
import { IUserShort } from "../shared/model/IUserShort";
import { ITrainer } from "../shared/types/ITrainer";
import { EventDefinition } from "./../model/EventDefinition";
import { EventInstance } from "./../model/EventInstance";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";
import { findTrainers } from "./utils/findTrainers";

export class EventDefinitionRepo extends SequelizeRepository<IEventDefinition> {
  constructor() {
    super(EventDefinition, [{ model: EventInstance, as: "eventInstances" }]);
  }

  findByDateTimeSpanAndUser<K extends keyof IEventDefinition>(
    dateTimeSpan: IDateTimeSpan,
    userId: string,
    fields: K[]
  ): Promise<IEntitySubset<IEventDefinition, K>[]>;
  findByDateTimeSpanAndUser(
    dateTimeSpan: IDateTimeSpan,
    userId: string
  ): Promise<IEventDefinition[]>;
  async findByDateTimeSpanAndUser(
    dateTimeSpan: IDateTimeSpan,
    userId: string,
    fields?: unknown
  ): Promise<unknown> {
    let eventDefinitions =
      await this.selectEventDefinitionsInstancesAndRegistrations(
        dateTimeSpan,
        userId
      );
    eventDefinitions = this.restrictEntitiesFields(eventDefinitions, fields);
    return eventDefinitions;
  }

  findByDateTimeSpanAndInstances<K extends keyof IEventDefinition>(
    dateTimeSpan: IDateTimeSpan,
    fields: K[]
  ): Promise<IEntitySubset<IEventDefinition, K>[]>;
  findByDateTimeSpanAndInstances(
    dateTimeSpan: IDateTimeSpan
  ): Promise<IEventDefinition[]>;
  async findByDateTimeSpanAndInstances(
    dateTimeSpan: IDateTimeSpan,
    fields?: unknown
  ): Promise<unknown> {
    let eventDefinitions = await this.selectEventDefinitionsAndInstances(
      dateTimeSpan
    );
    eventDefinitions = this.restrictEntitiesFields(eventDefinitions, fields);
    return eventDefinitions;
  }

  findByDateTimeSpan<K extends keyof IEventDefinition>(
    dateTimeSpan: IDateTimeSpan,
    fields: K[]
  ): Promise<IEntitySubset<IEventDefinition, K>[]>;
  findByDateTimeSpan(dateTimeSpan: IDateTimeSpan): Promise<IEventDefinition[]>;
  async findByDateTimeSpan(
    dateTimeSpan: IDateTimeSpan,
    fields?: unknown
  ): Promise<unknown> {
    let eventDefinitions = await this.selectByDateTimeSpan(dateTimeSpan);
    eventDefinitions = this.restrictEntitiesFields(eventDefinitions, fields);
    return eventDefinitions;
  }

  async findByEventInstanceAndUser(
    eventInstanceId: string,
    requestedUserId: string
  ): Promise<IEventDefinition | undefined> {
    const eventDefinition = await this.selectByEventInstanceAndUser(
      eventInstanceId,
      requestedUserId
    );
    return eventDefinition;
  }

  findById<K extends keyof IEventDefinition>(
    id: string,
    fields: K[]
  ): Promise<IEntitySubset<IEventDefinition, K> | undefined>;
  findById(id: string): Promise<IEventDefinition | undefined>;
  async findById(
    id: string,
    fields?: unknown
  ): Promise<IEventDefinition | undefined> {
    const dataDefinition = await this.selectById(id);
    if (dataDefinition) {
      const eventDefinitions = this.restrictEntitiesFields(
        [dataDefinition],
        fields
      );
      return eventDefinitions[0];
    } else {
      return undefined;
    }
  }

  /**
   * Returns the possible trainers for an event definition by the given {@link eventDefinitionId}.
   * This means all user having the role TRAINER, but also users, which might be assigned but haven't have the trainer role anymore.
   */
  async findTrainers(eventDefinitionId: string): Promise<IUserShort[]> {
    // find trainers assigned to the event definition
    const data = await EventDefinitionTrainer.findAll({
      where: { eventDefinitionId },
    });
    const assignedTrainers = data.map((model) => model.toJSON());

    const trainers = await findTrainers(assignedTrainers);
    return trainers;
  }

  insert<K extends keyof IEventDefinition>(
    entity: IEntityDetails<IEventDefinition>,
    fields: K[]
  ): Promise<IEntitySubset<IEventDefinition, K>>;
  insert(entity: IEntityDetails<IEventDefinition>): Promise<IEventDefinition>;
  async insert<K extends keyof IEventDefinition>(
    entity: IEntityDetails<IEventDefinition>,
    fields?: K[]
  ): Promise<unknown> {
    if (fields) {
      const eventDefinition = await super.insert(entity, fields);
      await this.synchronizeTrainers(eventDefinition.id, entity.trainers);
      return eventDefinition;
    } else {
      const eventDefinition = await super.insert(entity);
      await this.synchronizeTrainers(eventDefinition.id, entity.trainers);
      return eventDefinition;
    }
  }

  async update(entity: IEventDefinition): Promise<boolean> {
    let wasUpdated = await super.update(entity);
    await this.synchronizeTrainers(entity.id, entity.trainers);
    return wasUpdated;
  }

  private async synchronizeTrainers(
    eventDefinitionId: string,
    trainers?: ITrainer[]
  ) {
    // Delete all existing trainer relations for this EventDefinition
    await EventDefinitionTrainer.destroy({
      where: { eventDefinitionId: eventDefinitionId },
    });

    // Add all currently set trainer relations
    const eventDefinitionTrainers: sequelize.Optional<
      IEventDefinitionTrainer,
      never
    >[] =
      trainers?.map((trainer) => ({
        eventDefinitionId: eventDefinitionId,
        userId: trainer.id,
      })) ?? [];
    await EventDefinitionTrainer.bulkCreate(eventDefinitionTrainers);
  }

  /**
   * Selects event definitions by the given {@link dateTimeSpan} otherwise returns an empty list.
   */
  private async selectByDateTimeSpan(
    dateTimeSpan: IDateTimeSpan
  ): Promise<IEventDefinition[]> {
    const query = `
        WITH RECURSIVE date_range AS (
            SELECT DATE(:from) AS datum
            UNION ALL
            SELECT DATE_ADD(datum, INTERVAL 1 DAY)
            FROM date_range
            WHERE datum < DATE(:to)
        )

        SELECT 
          def.*,
          def_usr.id AS def_usr_id,
          def_profile.firstname AS def_profile_firstname,
          def_profile.lastname AS def_profile_lastname
        FROM \`event-definitions\` AS def

        # join EventDefinition trainers
        LEFT JOIN \`event-definitions-trainers\` AS trainerRel
        ON trainerRel.eventDefinitionId = def.id
        LEFT JOIN \`users\` AS def_usr
        ON def_usr.id = trainerRel.userId
        LEFT JOIN \`user-profiles\` AS def_profile
        ON def_profile.userId = def_usr.id
        WHERE
        # once
        (recurrence = 0 AND (
            DATE(\`from\`) >= DATE(:from) AND DATE(\`to\`) <= DATE(:to)
        )) OR 

        # daily
        (recurrence = 1 AND (
            DATE(\`from\`) <= DATE(:to) AND ( 
                (DATE(\`to\`) = DATE(\`from\`)) OR (DATE(\`to\`) > DATE(:from))
            )
        )) OR 

        # weekly
        (recurrence = 2 AND (
            DATE(\`from\`) <= DATE(:to) AND ( 
                (DATE(\`to\`) = DATE(\`from\`)) OR (DATE(\`to\`) > DATE(:from))
            ) AND
            DAYOFWEEK(\`from\`) IN (SELECT DAYOFWEEK(datum) FROM date_range)
        )) OR

        # monthly
        (recurrence = 3 AND (
            DATE(\`from\`) <= DATE(:to) AND ( 
                (DATE(\`to\`) = DATE(\`from\`)) OR (DATE(\`to\`) > DATE(:from))
            ) AND
            DAY(\`from\`) IN (SELECT DAY(datum) FROM date_range)
        ));
    `;

    const data = await db.query<IEventDefinition>(query, {
      replacements: {
        from: dateTimeSpan.from,
        to: dateTimeSpan.to,
      },
      type: sequelize.QueryTypes.SELECT,
    });
    return this.convertToEventDefinition(data);
  }

  /**
   * Selects an event definition by the given {@link eventDefinitionId} otherwise returns undefined.
   */
  private async selectById(
    eventDefinitionId: string
  ): Promise<IEventDefinition | undefined> {
    const query = `
        SELECT 
          def.*,
          def_usr.id AS def_usr_id,
          def_profile.firstname AS def_profile_firstname,
          def_profile.lastname AS def_profile_lastname
        FROM \`event-definitions\` AS def

        # join EventDefinition trainers
        LEFT JOIN \`event-definitions-trainers\` AS trainerRel
        ON trainerRel.eventDefinitionId = def.id
        LEFT JOIN \`users\` AS def_usr
        ON def_usr.id = trainerRel.userId
        LEFT JOIN \`user-profiles\` AS def_profile
        ON def_profile.userId = def_usr.id
        WHERE def.id = :eventDefinitionId
    `;

    const data = await db.query<IEventDefinition>(query, {
      replacements: {
        eventDefinitionId: eventDefinitionId,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    const eventDefinitions = this.convertToEventDefinition(data);
    return eventDefinitions[0];
  }

  private async selectEventDefinitionsAndInstances(
    dateTimeSpan: IDateTimeSpan
  ): Promise<IEventDefinition[]> {
    const query = `
        # get dates of range
        WITH RECURSIVE date_range AS (
            SELECT DATE(:from) AS datum
            UNION ALL
            SELECT DATE_ADD(datum, INTERVAL 1 DAY)
            FROM date_range
            WHERE datum < DATE(:to)
        )

        SELECT 
          def.*,
          def_usr.id AS def_usr_id,
          def_profile.firstname AS def_profile_firstname,
          def_profile.lastname AS def_profile_lastname,
          inst.id AS inst_id,
          inst.calledOff as called_off,
          inst.color AS inst_color,
          inst.\`description\` AS inst_description,
          inst.\`from\` AS inst_from,
          inst.state AS inst_state,
          inst.title AS inst_title,
          inst.\`to\` AS inst_to,
          inst.createdAt AS inst_createdAt,
          inst.updatedAt AS inst_updatedAt,
          inst.eventDefinitionId AS inst_eventDefinitionId,
          inst_usr.id AS inst_usr_id,
          inst_profile.firstname AS inst_profile_firstname,
          inst_profile.lastname AS inst_profile_lastname
        FROM \`event-definitions\` AS def

        # join EventDefinition trainers
        LEFT JOIN \`event-definitions-trainers\` AS trainerRel
        ON trainerRel.eventDefinitionId = def.id
        LEFT JOIN \`users\` AS def_usr
        ON def_usr.id = trainerRel.userId
        LEFT JOIN \`user-profiles\` AS def_profile
        ON def_profile.userId = def_usr.id

        LEFT JOIN \`event-instances\` AS inst
        ON def.id = inst.eventDefinitionId
        AND Date(inst.\`from\`)>= DATE(:from) AND DATE(inst.\`to\`) <= DATE(:to)

        # join EventInstance trainers
        LEFT JOIN \`event-instances-trainers\` AS inst_trainerRel
        ON inst_trainerRel.eventInstanceId = inst.id
        LEFT JOIN \`users\` AS inst_usr
        ON inst_usr.id = inst_trainerRel.userId
        LEFT JOIN \`user-profiles\` AS inst_profile
        ON inst_profile.userId = inst_usr.id

        WHERE 
        # once
        ((def.recurrence = 0 && (
          DATE(def.\`from\`) >= DATE(:from) && DATE(def.\`to\`) <= DATE(:to)
        )) OR 

        # daily
        (def.recurrence = 1 && (
          # matches given date time span
          DATE(def.\`from\`) <= DATE(:to) && ( 
            (DATE(def.\`to\`) = DATE(def.\`from\`)) OR (DATE(def.\`to\`) > DATE(:from))
          )
        )) OR 

        # weekly
        (def.recurrence = 2 AND (
          # matches given date time span
          (DATE(def.\`from\`) <= DATE(:to) AND ( 
            (DATE(def.\`to\`) = DATE(def.\`from\`)) OR (DATE(def.\`to\`) > DATE(:from))
          )) AND
          
          # matches the weekdays of the date time span
          DAYOFWEEK(def.\`from\`) IN (SELECT DAYOFWEEK(datum) FROM date_range)
        )) OR

        # monthly
        (def.recurrence = 3 && (
          # matches given date time span
          (DATE(def.\`from\`) <= DATE(:to) && ( 
            (DATE(def.\`to\`) = DATE(def.\`from\`)) OR (DATE(def.\`to\`) > DATE(:from))
          )) AND
          
          # matches the weekdays of the date time span
          DAY(def.\`from\`) IN (SELECT DAY(datum) FROM date_range)
        )))
    `;

    const data = await db.query<IEventDefinition>(query, {
      replacements: {
        from: dateTimeSpan.from,
        to: dateTimeSpan.to,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    return this.convertToEventDefinition(data);
  }

  private async selectEventDefinitionsInstancesAndRegistrations(
    dateTimeSpan: IDateTimeSpan,
    userId?: string
  ): Promise<IEventDefinition[]> {
    const query = `
        # get dates of range
        WITH RECURSIVE date_range AS (
            SELECT DATE(:from) AS datum
            UNION ALL
            SELECT DATE_ADD(datum, INTERVAL 1 DAY)
            FROM date_range
            WHERE datum < DATE(:to)
        )

        SELECT 
          def.*,
          def_usr.id AS def_usr_id,
          def_profile.firstname AS def_profile_firstname,
          def_profile.lastname AS def_profile_lastname,
          inst.id AS inst_id,
          inst.calledOff as called_off,
          inst.color AS inst_color,
          inst.\`description\` AS inst_description,
          inst.\`from\` AS inst_from,
          inst.state AS inst_state,
          inst.title AS inst_title,
          inst.\`to\` AS inst_to,
          inst.createdAt AS inst_createdAt,
          inst.updatedAt AS inst_updatedAt,
          inst.eventDefinitionId AS inst_eventDefinitionId,
          inst_usr.id AS inst_usr_id,
          inst_profile.firstname AS inst_profile_firstname,
          inst_profile.lastname AS inst_profile_lastname,
          reg.id AS reg_id,
          reg.manuallyAdded AS reg_manuallyAdded,
          reg.state AS reg_state,
          reg.userId AS reg_userId,
          reg.createdAt AS reg_createdAt,
          reg.updatedAt AS reg_updatedAt,
          reg.eventInstanceId AS reg_eventInstanceId
        FROM \`event-definitions\` AS def

        # join EventDefinition trainers
        LEFT JOIN \`event-definitions-trainers\` AS trainerRel
        ON trainerRel.eventDefinitionId = def.id
        LEFT JOIN \`users\` AS def_usr
        ON def_usr.id = trainerRel.userId
        LEFT JOIN \`user-profiles\` AS def_profile
        ON def_profile.userId = def_usr.id

        LEFT JOIN \`event-instances\` AS inst
        ON def.id = inst.eventDefinitionId
        AND Date(inst.\`from\`)>= DATE(:from) AND DATE(inst.\`to\`) <= DATE(:to)
        LEFT JOIN \`event-registrations\` AS reg
        ON inst.id = reg.eventInstanceId
        ${userId ? `AND reg.userId = "${userId}"` : ""}

        # join EventInstance trainers
        LEFT JOIN \`event-instances-trainers\` AS inst_trainerRel
        ON inst_trainerRel.eventInstanceId = inst.id
        LEFT JOIN \`users\` AS inst_usr
        ON inst_usr.id = inst_trainerRel.userId
        LEFT JOIN \`user-profiles\` AS inst_profile
        ON inst_profile.userId = inst_usr.id

        WHERE 
        # once
        ((recurrence = 0 && (
          DATE(def.\`from\`) >= DATE(:from) && DATE(def.\`to\`) <= DATE(:to)
        )) OR 

        # daily
        (recurrence = 1 && (
          # matches given date time span
          DATE(def.\`from\`) <= DATE(:to) && ( 
            (DATE(def.\`to\`) = DATE(def.\`from\`)) OR (DATE(def.\`to\`) > DATE(:from))
          )
        )) OR 

        # weekly
        (recurrence = 2 AND (
          # matches given date time span
          (DATE(def.\`from\`) <= DATE(:to) AND ( 
            (DATE(def.\`to\`) = DATE(def.\`from\`)) OR (DATE(def.\`to\`) > DATE(:from))
          )) AND
          
          # matches the weekdays of the date time span
          DAYOFWEEK(def.\`from\`) IN (SELECT DAYOFWEEK(datum) FROM date_range)
        )) OR

        # monthly
        (recurrence = 3 && (
          # matches given date time span
          (DATE(def.\`from\`) <= DATE(:to) && ( 
            (DATE(def.\`to\`) = DATE(def.\`from\`)) OR (DATE(def.\`to\`) > DATE(:from))
          )) AND
          
          # matches the weekdays of the date time span
          DAY(def.\`from\`) IN (SELECT DAY(datum) FROM date_range)
        )))
    `;

    const data = await db.query<IEventDefinition>(query, {
      replacements: {
        from: dateTimeSpan.from,
        to: dateTimeSpan.to,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    return this.convertToEventDefinition(data);
  }

  /**
   *
   */
  private async selectByEventInstanceAndUser(
    eventInstanceId: string,
    userId: string
  ): Promise<IEventDefinition | undefined> {
    const query = `
        SELECT
          def.*,
          inst.id AS inst_id,
          inst.calledOff as called_off,
          inst.color AS inst_color,
          inst.\`description\` AS inst_description,
          inst.\`from\` AS inst_from,
          inst.state AS inst_state,
          inst.title AS inst_title,
          inst.\`to\` AS inst_to,
          inst.createdAt AS inst_createdAt,
          inst.updatedAt AS inst_updatedAt,
          inst.eventDefinitionId AS inst_eventDefinitionId,
          inst_usr.id AS inst_usr_id,
          inst_profile.firstname AS inst_profile_firstname,
          inst_profile.lastname AS inst_profile_lastname,          
          reg.id AS reg_id,
          reg.manuallyAdded AS reg_manuallyAdded,
          reg.state AS reg_state,
          reg.userId AS reg_userId,
          reg.createdAt AS reg_createdAt,
          reg.updatedAt AS reg_updatedAt,
          reg.eventInstanceId AS reg_eventInstanceId
        FROM \`event-definitions\` AS def

        # join EventDefinitions
        INNER JOIN \`event-instances\` AS inst
        ON inst.eventDefinitionId = def.id

        # join EventInstance registrations
        LEFT JOIN \`event-registrations\` AS reg
        ON reg.eventInstanceId = inst.id

        # join EventInstance trainers
        LEFT JOIN \`event-instances-trainers\` AS inst_trainerRel
        ON inst_trainerRel.eventInstanceId = "${eventInstanceId}"
        LEFT JOIN \`users\` AS inst_usr
        ON inst_usr.id = inst_trainerRel.userId
        LEFT JOIN \`user-profiles\` AS inst_profile
        ON inst_profile.userId = inst_usr.id

        AND reg.userId = "${userId}"
        WHERE inst.id="${eventInstanceId}"
    `;

    const data = await db.query<IEventDefinition>(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    return this.convertToEventDefinition(data)[0];
  }

  private convertToEventDefinition(
    data: IEventDefinition[]
  ): IEventDefinition[] {
    const eventDefinitionsDb: any = {};

    data.forEach((row) => {
      // create event definition, if not yet available
      if (!eventDefinitionsDb[row.id]) {
        const eventDefinition: IEventDefinition = {
          id: row.id,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
          color: row.color,
          creatorUserId: row.creatorUserId,
          description: row.description,
          from: row.from,
          isMemberOnly: (row.isMemberOnly as any) === 1 ? true : false,
          recurrence: row.recurrence,
          title: row.title,
          to: row.to,
          eventInstances: [],
          trainers: [],
        };
        eventDefinitionsDb[row.id] = eventDefinition;
      }

      const rowAny: any = row;

      // create and add event definition trainers, if not yet available
      if (
        rowAny.def_usr_id &&
        rowAny.def_profile_firstname &&
        rowAny.def_profile_lastname
      ) {
        // add trainer only once
        const index = (
          eventDefinitionsDb[row.id] as IEventDefinition
        ).trainers?.findIndex((trainer) => trainer.id === rowAny.def_usr_id);
        if (index === -1) {
          const trainer: ITrainer = {
            id: rowAny.def_usr_id,
            firstname: rowAny.def_profile_firstname,
            lastname: rowAny.def_profile_lastname,
          };
          (eventDefinitionsDb[row.id] as IEventDefinition).trainers?.push(
            trainer
          );
        }
      }

      // create and add event instances if available
      if (rowAny.inst_id) {
        const index = (
          eventDefinitionsDb[row.id] as IEventDefinition
        ).eventInstances?.findIndex(
          (eventInstance) => eventInstance.id === rowAny.inst_id
        );
        if (index === -1) {
          const eventInstance: IEventInstance = {
            id: rowAny.inst_id,
            calledOff: rowAny.called_off === 0 ? false : true,
            color: rowAny.inst_color,
            createdAt: rowAny.inst_createdAt,
            updatedAt: rowAny.inst_updatedAt,
            description: rowAny.inst_description,
            eventDefinitionId: rowAny.inst_eventDefinitionId,
            from: rowAny.inst_from,
            state: rowAny.inst_state,
            title: rowAny.inst_title,
            to: rowAny.inst_to,
            eventRegistrations: [],
            trainers: [],
          };

          (eventDefinitionsDb[row.id] as IEventDefinition).eventInstances?.push(
            eventInstance
          );
        }
      }

      // create and add event registration if available
      if (rowAny.reg_id) {
        const eventInstance = (
          eventDefinitionsDb[row.id] as IEventDefinition
        ).eventInstances?.find(
          (eventInstance) => eventInstance.id === rowAny.inst_id
        );

        const index = eventInstance?.eventRegistrations?.findIndex(
          (eventRegistration) => eventRegistration.id === rowAny.reg_id
        );
        if (index === -1) {
          const eventRegistration: IEventRegistration = {
            id: rowAny.reg_id,
            createdAt: rowAny.reg_createdAt,
            updatedAt: rowAny.reg_updatedAt,
            eventInstanceId: rowAny.reg_eventInstanceId,
            manuallyAdded: rowAny.reg_manuallyAdded,
            state: rowAny.reg_state,
            userId: rowAny.reg_userId,
          };
          eventInstance?.eventRegistrations?.push(eventRegistration);
        }
      }

      // create and add event instance trainers if available
      if (
        rowAny.inst_usr_id &&
        rowAny.inst_profile_firstname &&
        rowAny.inst_profile_lastname
      ) {
        const eventInstance = (
          eventDefinitionsDb[row.id] as IEventDefinition
        ).eventInstances?.find(
          (eventInstance) => eventInstance.id === rowAny.inst_id
        );
        const index = eventInstance?.trainers?.findIndex(
          (trainer) => trainer.id === rowAny.inst_usr_id
        );

        if (index === -1) {
          const trainer: ITrainer = {
            id: rowAny.inst_usr_id,
            firstname: rowAny.inst_profile_firstname,
            lastname: rowAny.inst_profile_lastname,
          };
          eventInstance?.trainers?.push(trainer);
        }
      }
    });

    // convert to array
    return Object.values(eventDefinitionsDb);
  }
}
