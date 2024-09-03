import { Recurrence } from "../../core/types/Recurrence";

export interface IAppointmentFormProps {
  disabled?: boolean;
  description: string;
  descriptionError?: string;
  descriptionIsOptional?: boolean;
  fromDate: string;
  fromTime: string;
  recurrence: Recurrence;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setFromDate: React.Dispatch<React.SetStateAction<string>>;
  setFromTime: React.Dispatch<React.SetStateAction<string>>;
  setRecurrence: React.Dispatch<React.SetStateAction<Recurrence>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setToDate: React.Dispatch<React.SetStateAction<string>>;
  setToTime: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  titleError?: string;
  titleIsOptional?: boolean;
  toDate: string;
  toTime: string;
}
