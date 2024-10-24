import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { Recurrence } from "../../core/types/Recurrence";
import { IEventDetails } from "../types/IEventDetails";
import { IEventInstance } from "./IEventInstance";

/**
 * This interface represents a specific event, which serves as template for real events
 */
export interface IEventDefinition extends IEntity, IEventDetails {
  creatorUserId: string;
  eventInstances?: IEventInstance[];
  isMemberOnly: boolean;
  recurrence: Recurrence;
}

export const EventDefinitionRouteMeta: IRouteMeta = {
  path: "/event-definitions",
};
