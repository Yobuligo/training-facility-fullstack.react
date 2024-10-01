import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { EventCreator } from "../../../services/EventCreator";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { uuid } from "../../../utils/uuid";
import { IEvent } from "../../eventCalendar/model/IEvent";

export const eventCreator: EventCreator<IEvent> = (
  eventDefinition: IEventDefinition,
  dateTimeSpan: IDateTimeSpan
) => ({
  id: uuid(),
  dateTimeSpan,
  eventDefinition,
});
