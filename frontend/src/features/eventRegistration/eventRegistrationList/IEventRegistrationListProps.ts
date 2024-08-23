import { IEventRegistration } from "../../../shared/model/IEventRegistration";

export interface IEventRegistrationListProps {
  eventRegistrations: IEventRegistration[];
  onDelete?: (eventRegistration: IEventRegistration) => void;
}
