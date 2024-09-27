import { IEventRegistration } from "../../../shared/model/IEventRegistration";
import { IUserTrialTraining } from "../../../shared/model/IUserTrialTraining";

export interface IEventRegistrationListProps {
  eventRegistrations: IEventRegistration[];
  onDelete?: (eventRegistration: IEventRegistration) => void;
  userTrialTrainings: IUserTrialTraining[];
}
