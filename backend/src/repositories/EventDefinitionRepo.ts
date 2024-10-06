import sequelize from "sequelize";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { db } from "../db/db";
import { EventDefinition } from "../model/EventDefinition";
import { EventInstance } from "../model/EventInstance";
import { IEventDefinition } from "../shared/model/IEventDefinition";
import { IEventInstance } from "../shared/model/IEventInstance";
import { IEventRegistration } from "../shared/model/IEventRegistration";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

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
    let eventDefinitions = await this.selectEventDefinitionsAndInstances(
      dateTimeSpan,
      userId
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
    let eventDefinitions = await this.selectEventDefinitions(dateTimeSpan);
    eventDefinitions = this.restrictEntitiesFields(eventDefinitions, fields);
    return eventDefinitions;
  }

  private async selectEventDefinitions(
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

        SELECT * FROM \`event-definitions\` WHERE 
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

    let eventDefinitions = await db.query<IEventDefinition>(query, {
      replacements: {
        from: dateTimeSpan.from,
        to: dateTimeSpan.to,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    this.correctBooleans(eventDefinitions);
    return eventDefinitions;
  }

  private async selectEventDefinitionsAndInstances(
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
          reg.id AS reg_id,
          reg.manuallyAdded AS reg_manuallyAdded,
          reg.state AS reg_state,
          reg.userId AS reg_userId,
          reg.createdAt AS reg_createdAt,
          reg.updatedAt AS reg_updatedAt,
          reg.eventInstanceId AS reg_eventInstanceId
        FROM \`event-definitions\` AS def
        LEFT JOIN \`event-instances\` AS inst
        ON def.id = inst.eventDefinitionId
        AND Date(inst.\`from\`)>= DATE(:from) AND DATE(inst.\`to\`) <= DATE(:to)
        LEFT JOIN \`event-registrations\` AS reg
        ON inst.id = reg.eventInstanceId
        ${userId ? `AND reg.userId = "${userId}"` : ""}
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
        };
        eventDefinitionsDb[row.id] = eventDefinition;
      }

      // create and add event instance if available
      const rowAny: any = row;
      if (rowAny.inst_id) {
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
        };

        (eventDefinitionsDb[row.id] as IEventDefinition).eventInstances?.push(
          eventInstance
        );
      }

      // create and add event registration if available
      if (rowAny.reg_id) {
        const eventRegistration: IEventRegistration = {
          id: rowAny.reg_id,
          createdAt: rowAny.reg_createdAt,
          updatedAt: rowAny.reg_updatedAt,
          eventInstanceId: rowAny.reg_eventInstanceId,
          manuallyAdded: rowAny.reg_manuallyAdded,
          state: rowAny.reg_state,
          userId: rowAny.reg_userId,
        };

        const eventInstance = (
          eventDefinitionsDb[row.id] as IEventDefinition
        ).eventInstances?.find(
          (eventInstance) => eventInstance.id === rowAny.inst_id
        );
        eventInstance?.eventRegistrations?.push(eventRegistration);
      }
    });

    // convert to array
    return Object.values(eventDefinitionsDb);
  }

  private correctBooleans(eventDefinitions: IEventDefinition[]): void {
    eventDefinitions.forEach((eventDefinition) => {
      eventDefinition.isMemberOnly =
        (eventDefinition.isMemberOnly as any) === 1 ? true : false;
    });
  }
}
