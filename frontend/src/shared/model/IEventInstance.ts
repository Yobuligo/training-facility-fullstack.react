import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { IDateTimeSpan } from "../../core/services/date/IDateTimeSpan";
import { EventInstanceState } from "../types/EventInstanceState";
import { IEventRegistration } from "./IEventRegistration";
import { IUserTrialTraining } from "./IUserTrialTraining";

/**
 * This interface represents a specific event instance based on an event definition
 */
export interface IEventInstance extends IEntity, IDateTimeSpan {
  color: string;
  description: string;
  title: string;
  eventDefinitionId: string;
  eventRegistrations?: IEventRegistration[];
  state: EventInstanceState;
  userTrialTrainings?: IUserTrialTraining[];
}

export const EventInstanceRouteMeta: IRouteMeta = { path: "/event-instances" };
