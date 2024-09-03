import { IDateTimeSpan } from "../../core/services/date/IDateTimeSpan";
import { Recurrence } from "../../core/types/Recurrence";
import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { IEventInstance } from "./IEventInstance";

/**
 * This interface represents a specific event, which serves as template for real events
 */
export interface IEventDefinition extends IEntity, IDateTimeSpan {
  color: string;
  creator: string;
  description: string;
  eventInstances?: IEventInstance[];
  recurrence: Recurrence;
  title: string;
}

export const EventDefinitionRouteMeta: IRouteMeta = {
  path: "/event-definitions",
};
