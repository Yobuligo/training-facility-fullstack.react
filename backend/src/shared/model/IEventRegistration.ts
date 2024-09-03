import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserId } from "../../core/api/types/IHaveUserId";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { EventRegistrationState } from "../types/EventRegistrationState";
import { IEventInstance } from "./IEventInstance";
import { IUserProfile } from "./IUserProfile";

/**
 * This interface represents a specific registration of a user on an event
 */
export interface IEventRegistration extends IEntity, IHaveUserId {
  eventInstance?: IEventInstance;
  eventInstanceId: string;
  state: EventRegistrationState;
  manuallyAdded: boolean;
  userProfile?: IUserProfile;
}

export const EventRegistrationRouteMeta: IRouteMeta = {
  path: "/event-registrations",
};
