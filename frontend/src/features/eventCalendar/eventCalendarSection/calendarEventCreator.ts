import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { EventCreator } from "../../../services/EventCreator";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { ICalendarEvent } from "../model/ICalendarEvent";

/**
 * This function is responsible for creating instances of type {@link ICalendarEvent}.
 */
export const calendarEventCreator: EventCreator<ICalendarEvent> = (
  evenDefinition: IEventDefinition,
  dateTimeSpan: IDateTimeSpan
) => {
  return {
    eventDefinition: evenDefinition,
    dateTimeSpan: dateTimeSpan,
    start: dateTimeSpan.from,
    end: dateTimeSpan.to,
    title: evenDefinition.title,
  };
};
