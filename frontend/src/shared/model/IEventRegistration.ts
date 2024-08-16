import { EventState } from "../types/EventState";
import { IEntity } from "../types/IEntity";
import { IHaveUserId } from "../types/IHaveUserId";
import { IEventInstance } from "./IEventInstance";

/**
 * This interface represents a specific registration of a user on an event
 */
export interface IEventRegistration extends IEntity, IHaveUserId {
  eventInstance: IEventInstance;
  eventInstanceId: string;
  eventState: EventState;
}
