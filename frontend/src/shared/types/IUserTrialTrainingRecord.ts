import { IDateTimeSpan } from "../../core/services/date/IDateTimeSpan";
import { EventRegistrationState } from "./EventRegistrationState";

/**
 * An instance of this interface represents a specific user trial training record
 * with the most important information
 */
export interface IUserTrialTrainingRecord extends IDateTimeSpan {
  id: string;
  eventInstanceId: string;
  state: EventRegistrationState;
}
