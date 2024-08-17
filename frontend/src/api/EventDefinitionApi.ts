import { DateTime } from "../core/services/date/DateTime";
import { DateTimeIterator } from "../core/services/date/DateTimeIterator";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
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
    const weekdays = new Set<number>();
    DateTimeIterator.iterate(dateTimeSpan.from, dateTimeSpan.to, (cursor) => {
      weekdays.add(cursor.getDay());
    });
    // let cursor = new Date(dateTimeSpan.from);
    // while (cursor <= dateTimeSpan.to) {
    //   weekdays.add(cursor.getDay());
    //   cursor = DateTime.addDays(cursor, 1);
    // }

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

      // does event of recurrence type "week" matches the range?
      if (eventDefinition.recurrence === Recurrence.WEEKLY) {
        // get weekday of definition and check if the weekday belongs to the weekdays of the given dateTimeSpan
        const weekday = eventDefinition.from.getDay();
        return weekdays.has(weekday);
      }

      return false;
    });
    return eventDefinitions;
  }
}
