import { IEventInstance } from "./IEventInstance";

/**
 * This interface represents an event instance with the additional information,
 * if the current user is assigned as trainer for this event instance.
 */
export interface IEventInstanceAndRole extends IEventInstance {
  isCurrentUserTrainer: boolean;
}
