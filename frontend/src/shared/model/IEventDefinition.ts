import { IDateTimeSpan } from "../../core/services/date/IDateTimeSpan";
import { IEntity } from "../types/IEntity";
import { Recurrence } from "../types/Recurrence";

/**
 * This interface represents a specific event, which serves as template for real events
 */
export interface IEventDefinition extends IEntity, IDateTimeSpan {
  creator: string;
  description: string;
  recurrence: Recurrence;
  title: string;
}
