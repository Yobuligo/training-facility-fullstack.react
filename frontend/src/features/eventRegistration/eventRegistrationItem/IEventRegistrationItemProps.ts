import { IEventRegistration } from "../../../shared/model/IEventRegistration";

export interface IEventRegistrationItemProps {
  eventRegistration: IEventRegistration;
  onDelete?: (eventRegistration: IEventRegistration) => void;
}
