import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";

export interface IEvent {
  id: string;
  dateTimeSpan: IDateTimeSpan;
  eventDefinition: IEventDefinition;
}
