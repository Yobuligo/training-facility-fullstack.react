import { IDateTimeSpan } from "../../core/services/date/IDateTimeSpan";
import { EventInstanceState } from "../types/EventInstanceState";
import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { IEventDefinition } from "./IEventDefinition";
import { IEventRegistration } from "./IEventRegistration";

/**
 * This interface represents a specific event instance based on an event definition
 */
export interface IEventInstance extends IEntity, IDateTimeSpan {
  description: string;
  title: string;
  eventDefinition?: IEventDefinition;
  eventDefinitionId: string;
  eventRegistrations?: IEventRegistration[];
  state: EventInstanceState;
}

export const EventInstanceRouteMeta: IRouteMeta = { path: "/event-instances" };
