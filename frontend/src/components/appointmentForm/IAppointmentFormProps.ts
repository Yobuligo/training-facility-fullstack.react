import { Recurrence } from "../../core/types/Recurrence";

export interface IAppointmentFormProps {
  disabled?: boolean;
  description: string;
  descriptionError?: string;
  descriptionIsOptional?: boolean;
  fromDate: string;
  fromTime: string;

  /**
   * Defines if the appointment is only visible for members but not e.g. for people who wants to book a trial training.
   */
  isMemberOnly: boolean;

  recurrence: Recurrence;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setFromDate: React.Dispatch<React.SetStateAction<string>>;
  setFromTime: React.Dispatch<React.SetStateAction<string>>;
  setIsMemberOnly: React.Dispatch<React.SetStateAction<boolean>>;
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
