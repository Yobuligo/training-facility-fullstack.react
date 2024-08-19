import { EventState } from "../types/EventState";
import { IEntity } from "../types/IEntity";
import { IHaveUserId } from "../types/IHaveUserId";
import { IRouteMeta } from "../types/IRouteMeta";
import { IEventInstance } from "./IEventInstance";

/**
 * This interface represents a specific registration of a user on an event
 */
export interface IEventRegistration extends IEntity, IHaveUserId {
  eventInstance: IEventInstance;
  eventInstanceId: string;
  eventState: EventState;
}

export const EventRegistrationRouteMeta: IRouteMeta = {
  path: "/event-registrations",
};
