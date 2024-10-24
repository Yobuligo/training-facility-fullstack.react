import { IDateTimeSpan } from "../../core/services/date/IDateTimeSpan";

/**
 * An instance of this interface provides the core properties for event definitions and event instances.
 */
export interface IEventDetails extends IDateTimeSpan {
  color: string;
  description: string;
  title: string;
  trainerIds?: string[];
}
