import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { IEvent } from "../features/eventCalendar/model/IEvent";
import { IEventDefinition } from "../shared/model/IEventDefinition";

export type EventFactory<TEvent extends IEvent> = (
  eventDefinition: IEventDefinition,
  dateTimeSpan: IDateTimeSpan
) => TEvent;
