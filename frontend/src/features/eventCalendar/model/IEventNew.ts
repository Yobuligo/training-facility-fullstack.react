import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";

export interface IEventNew {
  dateTimeSpan: IDateTimeSpan;
  eventDefinition: IEventDefinition;
}
