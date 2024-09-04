import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { DateTime } from "../core/services/date/DateTime";
import { DateTimeIterator } from "../core/services/date/DateTimeIterator";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { Lazy } from "../core/services/Lazy";
import { List } from "../core/services/list/List";
import { Recurrence } from "../core/types/Recurrence";
import { EventDefinition } from "../model/EventDefinition";
import { EventInstance } from "../model/EventInstance";
import { IEventDefinition } from "../shared/model/IEventDefinition";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class EventDefinitionRepo extends SequelizeRepository<IEventDefinition> {
  constructor() {
    super(EventDefinition, [{ model: EventInstance, as: "eventInstances" }]);
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
    // filter data definition
    const data = await this.model.findAll();
    const eventDefinitions = data.map((model) => model.toJSON());
    let filteredEventDefinitions = this.filterEventDefinition(
      dateTimeSpan,
      eventDefinitions
    );

    // restrict properties to given fields
    const keyFields = this.getKeyFields(fields);
    if (List.isNotEmpty(keyFields)) {
      filteredEventDefinitions = filteredEventDefinitions.map(
        (filteredEventDefinition) =>
          this.restrictFields(filteredEventDefinition, keyFields)
      );
    }
    return filteredEventDefinitions;
  }

  private filterEventDefinition(
    dateTimeSpan: IDateTimeSpan,
    eventDefinitions: IEventDefinition[]
  ): IEventDefinition[] {
    if (List.isEmpty(eventDefinitions)) {
      return [];
    }

    const lazyWeekdays = this.createLazyWeekdays(dateTimeSpan);
    const lazyDays = this.createLazyDays(dateTimeSpan);

    const filteredEventDefinitions = eventDefinitions.filter(
      (eventDefinition) => {
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
            !this.matchesDateTimeSpan(
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
            !this.matchesDateTimeSpan(
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
            !this.matchesDateTimeSpan(
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
      }
    );
    return filteredEventDefinitions;
  }

  /**
   * Build a list of weekdays for the given {@link dateTimeSpan}.
   */
  private createLazyWeekdays(dateTimeSpan: IDateTimeSpan): Lazy<Set<number>> {
    return new Lazy(() => {
      const weekdays = new Set<number>();
      DateTimeIterator.iterate(dateTimeSpan.from, dateTimeSpan.to, (cursor) => {
        weekdays.add(cursor.getDay());
      });
      return weekdays;
    });
  }

  /**
   * Build a list of days for the given {@link dateTimeSpan}.
   */
  private createLazyDays(dateTimeSpan: IDateTimeSpan): Lazy<Set<number>> {
    return new Lazy(() => {
      const days = new Set<number>();
      DateTimeIterator.iterate(dateTimeSpan.from, dateTimeSpan.to, (cursor) => {
        days.add(DateTime.toDay(cursor));
      });
      return days;
    });
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
}
