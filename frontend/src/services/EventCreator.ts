import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { IEvent } from "../features/eventCalendar/model/IEvent";
import { IEventDefinition } from "../shared/model/IEventDefinition";

/**
 * This function is responsible for creating events of type {@link TEvent}.
 */
export type EventCreator<TEvent extends IEvent> = (
  eventDefinition: IEventDefinition,
  dateTimeSpan: IDateTimeSpan
) => TEvent;
