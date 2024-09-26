import { IEntity } from "../../core/api/types/IEntity";
import { EventRegistrationState } from "../types/EventRegistrationState";

export interface IUserTrialTraining extends IEntity {
  firstname: string;
  lastname: String;
  email: string;
  eventInstanceId: string;
  state: EventRegistrationState;
}
