import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { IDateTimeSpan } from "../../core/services/date/IDateTimeSpan";
import { Recurrence } from "../../core/types/Recurrence";
import { IEventInstance } from "./IEventInstance";

/**
 * This interface represents a specific event, which serves as template for real events
 */
export interface IEventDefinition extends IEntity, IDateTimeSpan {
  color: string;
  creatorUserId: string;
  description: string;
  eventInstances?: IEventInstance[];
  isMemberOnly: boolean;
  recurrence: Recurrence;
  title: string;
}

export const EventDefinitionRouteMeta: IRouteMeta = {
  path: "/event-definitions",
};
