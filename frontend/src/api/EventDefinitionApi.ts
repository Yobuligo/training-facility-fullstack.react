import { DateTime } from "../core/services/date/DateTime";
import { DateTimeIterator } from "../core/services/date/DateTimeIterator";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { Lazy } from "../core/services/Lazy";
import {
  EventDefinitionRouteMeta,
  IEventDefinition,
} from "../shared/model/IEventDefinition";
import { Recurrence } from "../shared/types/Recurrence";
import { Repository } from "./core/Repository";
import { DummyEventDefinitions } from "./DummyEventDefinitions";

export class EventDefinitionApi extends Repository<IEventDefinition> {
  constructor() {
    super(EventDefinitionRouteMeta);
  }

  async insert(data: IEventDefinition): Promise<IEventDefinition> {
    DummyEventDefinitions.push(data);
    return data;
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

    const eventDefinitions = DummyEventDefinitions.filter((eventDefinition) => {
      // does event of recurrence type "once" matches the range?
      if (eventDefinition.recurrence === Recurrence.ONCE) {
        return (
          DateTime.toDate(eventDefinition.from) >=
            DateTime.toDate(dateTimeSpan.from) &&
          DateTime.toDate(eventDefinition.to) <=
            DateTime.toDate(dateTimeSpan.to)
        );
      }

      // does event of recurrence type "once" matches the range?
      // Daily fits for each day if event definition is in the range
      if (eventDefinition.recurrence === Recurrence.DAILY) {
        return this.matchesDateTimeSpan(dateTimeSpan, eventDefinition);
      }

      // does event of recurrence type "week" matches the range?
      if (eventDefinition.recurrence === Recurrence.WEEKLY) {
        if (!this.matchesDateTimeSpan(dateTimeSpan, eventDefinition)) {
          return false;
        }

        // get weekday of definition and check if the weekday belongs to the weekdays of the given dateTimeSpan
        const weekday = eventDefinition.from.getDay();
        return lazyWeekdays.data.has(weekday);
      }

      // // does event of recurrence type "week" matches the range?
      // if (eventDefinition.recurrence === Recurrence.MONTHLY) {
      //   if (!this.matchesDateTimeSpan(dateTimeSpan, eventDefinition)){
      //     return false
      //   }

      // }

      return false;
    });
    return eventDefinitions;
  }

  private matchesDateTimeSpan(
    dateTimeSpan: IDateTimeSpan,
    eventDefinition: IEventDefinition
  ): boolean {
    // From date must be equal or greater otherwise return false
    const dateTimeSpanFrom = DateTime.toDate(dateTimeSpan.from);
    const eventDefinitionFrom = DateTime.toDate(eventDefinition.from);
    if (eventDefinitionFrom < dateTimeSpanFrom) {
      return false;
    }

    // if from and to date of eventDefinition is equal, it means that the definition counts endless, this matches so return true
    const eventDefinitionTo = DateTime.toDate(eventDefinition.to);
    if (eventDefinitionFrom === eventDefinitionTo) {
      return true;
    }

    // To date must be equal or smaller otherwise return false
    const dateTimeSpanTo = DateTime.toDate(dateTimeSpan.to);
    if (eventDefinitionTo > dateTimeSpanTo) {
      return false;
    }

    return true;
  }
}
