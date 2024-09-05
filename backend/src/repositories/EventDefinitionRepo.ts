import sequelize from "sequelize";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { DateTime } from "../core/services/date/DateTime";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { List } from "../core/services/list/List";
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

    // restrict properties to given fields
    const keyFields = this.getKeyFields(fields);
    if (List.isNotEmpty(keyFields)) {
      eventDefinitions = eventDefinitions.map((eventDefinition) =>
        this.restrictFields(eventDefinition, keyFields)
      );
    }
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

    // restrict properties to given fields
    const keyFields = this.getKeyFields(fields);
    if (List.isNotEmpty(keyFields)) {
      eventDefinitions = eventDefinitions.map((eventDefinition) =>
        this.restrictFields(eventDefinition, keyFields)
      );
    }
    return eventDefinitions;
  }

  /**
   * Checks if {@link eventDefinition} matches a date time span {@link from} {@link to}
   */
  private matchesDateTimeSpan(
    from: Date,
    to: Date,
    eventDefinition: IEventDefinition
  ): boolean {
    // if the range is from e.g. 1 - 5 and eventDefinitionFrom starts at 7, it doesn't match
    const dateTimeSpanTo = DateTime.toDate(to);
    const eventDefinitionFrom = DateTime.toDate(eventDefinition.from);
    if (eventDefinitionFrom > dateTimeSpanTo) {
      return false;
    }

    // if from and to date of eventDefinition is equal, it means that the definition counts endless, this matches so return true
    const eventDefinitionTo = DateTime.toDate(eventDefinition.to);
    if (eventDefinitionFrom === eventDefinitionTo) {
      return true;
    }

    // if the range is from e.g. 5 - 10 and eventDefinitionTo ends at 4, it doesn't match
    const dateTimeSpanFrom = DateTime.toDate(from);
    if (eventDefinitionTo < dateTimeSpanFrom) {
      return false;
    }

    return true;
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

    const eventDefinitions = await db.query<IEventDefinition>(query, {
      replacements: {
        from: dateTimeSpan.from,
        to: dateTimeSpan.to,
      },
      type: sequelize.QueryTypes.SELECT,
    });

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
}
