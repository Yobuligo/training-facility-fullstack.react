import { DateTime } from "../core/services/date/DateTime";
import { DateTimeIterator } from "../core/services/date/DateTimeIterator";
import { Recurrence } from "../core/types/Recurrence";
import { IEvent } from "../features/eventCalendar/model/IEvent";
import { IEventDefinition } from "../shared/model/IEventDefinition";
import { matchesDateTimeSpan } from "../utils/matchesDateTimeSpan";
import { EventFactory } from "./EventFactory";

export class EventFactoryService {
  static createFromEventDefinitions<TEvent extends IEvent>(
    factory: EventFactory<TEvent>,
    eventDefinitions: IEventDefinition[],
    from: Date,
    to: Date
  ): IEvent[] {
    // an EventDefinition can occur several times
    // assume an EventDefinition occurs each monday and the range is a month
    // then we have to create events for each monday

    const events: IEvent[] = [];

    eventDefinitions.forEach((eventDefinition) => {
      switch (eventDefinition.recurrence) {
        case Recurrence.ONCE: {
          events.push(
            factory(eventDefinition, {
              from: eventDefinition.from,
              to: eventDefinition.to,
            })
          );
          break;
        }
        case Recurrence.DAILY: {
          // daily events must be added for each day of the date time span
          // which are greater than the from and smaller then to date of the eventDefinition
          DateTimeIterator.iterate(from, to, (current) => {
            if (!matchesDateTimeSpan(current, current, eventDefinition)) {
              return;
            }

            events.push(
              factory(eventDefinition, {
                from: DateTime.create(
                  DateTime.toDate(current),
                  DateTime.toTime(eventDefinition.from)
                ),
                to: DateTime.create(
                  DateTime.toDate(current),
                  DateTime.toTime(eventDefinition.to)
                ),
              })
            );
          });
          break;
        }
        case Recurrence.WEEKLY: {
          // find weekday of EventDefinition
          const weekday = eventDefinition.from.getDay();

          // add events for dates in the range with the same weekday,
          // which are greater than the from and smaller then to date of the eventDefinition
          DateTimeIterator.iterate(from, to, (current) => {
            if (!matchesDateTimeSpan(current, current, eventDefinition)) {
              return;
            }
            if (current.getDay() === weekday) {
              events.push(
                factory(eventDefinition, {
                  from: DateTime.create(
                    DateTime.toDate(current),
                    DateTime.toTime(eventDefinition.from)
                  ),
                  to: DateTime.create(
                    DateTime.toDate(current),
                    DateTime.toTime(eventDefinition.to)
                  ),
                })
              );
            }
          });
          break;
        }
        case Recurrence.MONTHLY: {
          DateTimeIterator.iterate(from, to, (current) => {
            // add entry for day if days are equal
            if (
              DateTime.toDay(current) === DateTime.toDay(eventDefinition.from)
            ) {
              events.push(
                factory(eventDefinition, {
                  from: DateTime.create(
                    DateTime.toDate(current),
                    DateTime.toTime(eventDefinition.from)
                  ),
                  to: DateTime.create(
                    DateTime.toDate(current),
                    DateTime.toTime(eventDefinition.to)
                  ),
                })
              );
            }
          });
          break;
        }
      }
    });
    return events;
  }
}
