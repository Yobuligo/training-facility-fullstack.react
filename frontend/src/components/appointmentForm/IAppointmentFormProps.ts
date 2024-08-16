import { IAppointment } from "./model/IAppointment";

export interface IAppointmentFormProps {
  appointment?: IAppointment;
  disabled?: boolean;
  onChange?: (appointment: IAppointment)=>void
}
