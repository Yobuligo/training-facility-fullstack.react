import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { Recurrence } from "../../../shared/types/Recurrence";

export interface IAppointment extends IDateTimeSpan {
  id: string;
  description: string;
  recurrence: Recurrence;
  title: string;
}
