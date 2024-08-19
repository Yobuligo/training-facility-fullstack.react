import { IDateTimeSpan } from "../../core/services/date/IDateTimeSpan";
import { IEntity } from "../types/IEntity";
import { IRouteMeta } from "../types/IRouteMeta";
import { Recurrence } from "../../core/types/Recurrence";
import { IEventInstance } from "./IEventInstance";

/**
 * This interface represents a specific event, which serves as template for real events
 */
export interface IEventDefinition extends IEntity, IDateTimeSpan {
  color: string;
  creator: string;
  description: string;
  eventInstance?: IEventInstance;
  eventInstanceId?: string;
  recurrence: Recurrence;
  title: string;
}

export const EventDefinitionRouteMeta: IRouteMeta = {
  path: "event-definitions",
};
