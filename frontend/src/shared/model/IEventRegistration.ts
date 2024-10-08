import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserId } from "../../core/api/types/IHaveUserId";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { EventRegistrationState } from "../types/EventRegistrationState";
import { IUser } from "./IUser";

/**
 * This interface represents a specific registration of a user on an event
 */
export interface IEventRegistration extends IEntity, IHaveUserId {
  eventInstanceId: string;
  state: EventRegistrationState;
  manuallyAdded: boolean;
  user?: IUser;
}

export const EventRegistrationRouteMeta: IRouteMeta = {
  path: "/event-registrations",
};
