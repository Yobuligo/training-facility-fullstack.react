import { IEventRegistration } from "../../../shared/model/IEventRegistration";

export interface IEventRegistrationItemUserProps {
  eventRegistration: IEventRegistration;
  onDelete?: (eventRegistration: IEventRegistration) => void;
}
