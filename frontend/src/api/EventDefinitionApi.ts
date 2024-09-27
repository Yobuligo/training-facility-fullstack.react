import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import {
  EventDefinitionRouteMeta,
  IEventDefinition,
} from "../shared/model/IEventDefinition";
import { SecretRequestRouteMeta } from "../shared/model/ISecretRequest";
import { EntityRepository } from "./core/EntityRepository";
import { RESTApi } from "./core/RESTApi";

export class EventDefinitionApi extends EntityRepository<IEventDefinition> {
  constructor() {
    super(EventDefinitionRouteMeta);
  }

  /**
   * Find all event definitions suitable for the given date time span.
   * Also loads all event instances of the definitions, which are matching the date time span
   * and corresponding registrations of the current user
   */
  async findByDataTimeSpanAndUser(
    dateTimeSpan: IDateTimeSpan,
    userId: string
  ): Promise<IEventDefinition[]> {
    const eventDefinitions = await RESTApi.get<IEventDefinition[]>(
      `${this.url}`,
      {
        urlParams: {
          from: dateTimeSpan.from.toString(),
          to: dateTimeSpan.to.toString(),
          userId: userId,
        },
      }
    );

    this.fillDates(eventDefinitions);
    return eventDefinitions;
  }

  async findByDateTimeSpan(
    dateTimeSpan: IDateTimeSpan
  ): Promise<IEventDefinition[]> {
    const eventDefinitions = await RESTApi.get<IEventDefinition[]>(
      `${this.url}`,
      {
        urlParams: {
          from: dateTimeSpan.from.toString(),
          to: dateTimeSpan.to.toString(),
        },
      }
    );

    this.fillDates(eventDefinitions);
    return eventDefinitions;
  }

  async findByDateTimeSpanSecured(
    dateTimeSpan: IDateTimeSpan
  ): Promise<IEventDefinition[]> {
    const secretRequest = this.createSecretRequest(undefined);
    const eventDefinitions = await RESTApi.post<IEventDefinition[]>(
      `${this.url}${SecretRequestRouteMeta.path}`,
      secretRequest,
      {
        urlParams: {
          from: dateTimeSpan.from.toString(),
          to: dateTimeSpan.to.toString(),
        },
      }
    );

    this.fillDates(eventDefinitions);
    return eventDefinitions;
  }

  /**
   * Provides a date object for each date property.
   */
  private fillDates(eventDefinitions: IEventDefinition[]): IEventDefinition[] {
    eventDefinitions.forEach((eventDefinition) => {
      eventDefinition.createdAt = new Date(eventDefinition.createdAt);
      eventDefinition.updatedAt = new Date(eventDefinition.updatedAt);
      eventDefinition.from = new Date(eventDefinition.from);
      eventDefinition.to = new Date(eventDefinition.to);
    });
    return eventDefinitions;
  }
}
