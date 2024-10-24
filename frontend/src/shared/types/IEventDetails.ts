import { IDateTimeSpan } from "../../core/services/date/IDateTimeSpan";
import { ITrainer } from "./ITrainer";

/**
 * An instance of this interface provides the core properties for event definitions and event instances.
 */
export interface IEventDetails extends IDateTimeSpan {
  color: string;
  description: string;
  title: string;
  trainers?: ITrainer[];
}
