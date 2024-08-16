import { IDateTimeSpan } from "../../core/services/date/IDateTimeSpan";
import { IEntity } from "../types/IEntity";
import { IEventDefinition } from "./IEventDefinition";

/**
 * This interface represents a specific event instance based on an event definition
 */
export interface IEventInstance extends IEntity, IDateTimeSpan {
  description: string;
  title: string;
  eventDefinition: IEventDefinition;
  eventDefinitionId: string;
}
