import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import {
  EventDefinitionRouteMeta,
  IEventDefinition,
} from "../shared/model/IEventDefinition";
import { IEventInstance } from "../shared/model/IEventInstance";
import { EntityRepository } from "./core/EntityRepository";
import { RESTApi } from "./core/RESTApi";
import { DummyEventInstances } from "./DummyEventInstances";
import { DummyEventRegistrations } from "./DummyEventRegistrations";
import { attach } from "./utils/attach";

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
    // find all eventDefinitions
    const eventDefinitions = await this.findByDateTimeSpan(dateTimeSpan);

    // attach all instances, which are matching the date time span
    eventDefinitions.forEach((eventDefinition) => {
      DummyEventInstances.filter((eventInstance) => {
        const matches = this.matchesEventDefinition(
          eventDefinition,
          eventInstance
        );
        if (matches) {
          if (eventDefinition.eventInstances) {
            attach(eventDefinition.eventInstances, eventInstance);
          }

          // attach all event registration which are belonging to the event instance and to the current user
          const eventRegistration = DummyEventRegistrations.find(
            (eventRegistration) =>
              eventRegistration.eventInstanceId === eventInstance.id &&
              eventRegistration.userId === userId
          );

          if (eventRegistration) {
            eventRegistration.eventInstance = eventInstance;
            eventRegistration.eventInstanceId = eventInstance.id;
            if (eventInstance.eventRegistrations) {
              attach(eventInstance.eventRegistrations, eventRegistration);
            }
          }

          return true;
        } else {
          return false;
        }
      });
    });

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

    // Provide Dates as object
    eventDefinitions.forEach((eventDefinition) => {
      eventDefinition.createdAt = new Date(eventDefinition.createdAt);
      eventDefinition.updatedAt = new Date(eventDefinition.updatedAt);
      eventDefinition.from = new Date(eventDefinition.from);
      eventDefinition.to = new Date(eventDefinition.to);
    });
    return eventDefinitions;
  }

  private matchesEventDefinition(
    eventDefinition: IEventDefinition,
    eventInstance: IEventInstance
  ): boolean {
    return eventInstance.eventDefinitionId === eventDefinition.id;
  }
}
