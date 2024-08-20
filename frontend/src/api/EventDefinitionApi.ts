import { DateTime } from "../core/services/date/DateTime";
import { DateTimeIterator } from "../core/services/date/DateTimeIterator";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { Lazy } from "../core/services/Lazy";
import { Recurrence } from "../core/types/Recurrence";
import {
  EventDefinitionRouteMeta,
  IEventDefinition,
} from "../shared/model/IEventDefinition";
import { IEventInstance } from "../shared/model/IEventInstance";
import { matchesDateTimeSpan } from "../utils/matchesDateTimeSpan";
import { Repository } from "./core/Repository";
import { DummyEventDefinitions } from "./DummyEventDefinitions";
import { DummyEventInstances } from "./DummyEventInstances";
import { DummyEventRegistrations } from "./DummyEventRegistrations";
import { attach } from "./utils/attach";

export class EventDefinitionApi extends Repository<IEventDefinition> {
  constructor() {
    super(EventDefinitionRouteMeta);
  }

  async deleteById(id: string): Promise<boolean> {
    const index = DummyEventDefinitions.findIndex((item) => item.id === id);
    if (index !== -1) {
      DummyEventDefinitions.splice(index, 1);
      return true;
    }
    return false;
  }

  async insert(data: IEventDefinition): Promise<IEventDefinition> {
    DummyEventDefinitions.push(data);
    return data;
  }

  async update(data: IEventDefinition): Promise<void> {
    const index = DummyEventDefinitions.findIndex(
      (item) => item.id === data.id
    );
    if (index !== -1) {
      DummyEventDefinitions.splice(index, 1, data);
    }
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
          attach(eventDefinition.eventInstances, eventInstance);

          // attach all event registration which are belonging to the event instance and to the current user
          const eventRegistration = DummyEventRegistrations.find(
            (eventRegistration) =>
              eventRegistration.eventInstanceId === eventInstance.id &&
              eventRegistration.userId === userId
          );

          if (eventRegistration) {
            eventRegistration.eventInstance = eventInstance;
            eventRegistration.eventInstanceId = eventInstance.id;
            attach(eventInstance.eventRegistrations, eventRegistration);
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
    // build a list of weekdays for the given dateTimeSpan
    const lazyWeekdays = new Lazy(() => {
      const weekdays = new Set<number>();
      DateTimeIterator.iterate(dateTimeSpan.from, dateTimeSpan.to, (cursor) => {
        weekdays.add(cursor.getDay());
      });
      return weekdays;
    });

    // build a list of days for the given dateTimeSpan
    const lazyDays = new Lazy(() => {
      const days = new Set<number>();
      DateTimeIterator.iterate(dateTimeSpan.from, dateTimeSpan.to, (cursor) => {
        days.add(DateTime.toDay(cursor));
      });
      return days;
    });

    const eventDefinitions = DummyEventDefinitions.filter((eventDefinition) => {
      // does event definition of recurrence type "once" matches the range?
      if (eventDefinition.recurrence === Recurrence.ONCE) {
        return (
          DateTime.toDate(eventDefinition.from) >=
            DateTime.toDate(dateTimeSpan.from) &&
          DateTime.toDate(eventDefinition.to) <=
            DateTime.toDate(dateTimeSpan.to)
        );
      }

      // does event definition of recurrence type "daily" matches the range?
      if (eventDefinition.recurrence === Recurrence.DAILY) {
        if (
          !matchesDateTimeSpan(
            dateTimeSpan.from,
            dateTimeSpan.to,
            eventDefinition
          )
        ) {
          return false;
        }
        return true;
      }

      // does event definition of recurrence type "week" matches the range?
      if (eventDefinition.recurrence === Recurrence.WEEKLY) {
        if (
          !matchesDateTimeSpan(
            dateTimeSpan.from,
            dateTimeSpan.to,
            eventDefinition
          )
        ) {
          return false;
        }

        // get weekday of event definition and check if the weekday belongs to the weekdays of the given dateTimeSpan
        const weekday = DateTime.toWeekday(eventDefinition.from);
        return lazyWeekdays.data.has(weekday);
      }

      if (eventDefinition.recurrence === Recurrence.MONTHLY) {
        if (
          !matchesDateTimeSpan(
            dateTimeSpan.from,
            dateTimeSpan.to,
            eventDefinition
          )
        ) {
          return false;
        }

        // get day of definition and check if the day belongs to the days of the given dateTimeSpan
        const day = DateTime.toDay(eventDefinition.from);
        return lazyDays.data.has(day);
      }

      return false;
    });
    return eventDefinitions;
  }

  private matchesEventDefinition(
    eventDefinition: IEventDefinition,
    eventInstance: IEventInstance
  ): boolean {
    return true;
  }
}
