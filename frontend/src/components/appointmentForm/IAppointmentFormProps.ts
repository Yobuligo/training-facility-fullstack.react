import { IDateTimeSpan } from "../../core/services/date/IDateTimeSpan";
import { Recurrence } from "../../shared/types/Recurrence";

export interface IAppointmentFormProps extends IDateTimeSpan {
  disabled?: boolean;
  description: string;
  recurrence: Recurrence;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setFrom: React.Dispatch<React.SetStateAction<Date>>;
  setRecurrence: React.Dispatch<React.SetStateAction<Recurrence>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setTo: React.Dispatch<React.SetStateAction<Date>>;
  title: string;
}
