import { Event } from "react-big-calendar";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";

export interface IEvent extends Event {
  id: string;
  eventDefinition: IEventDefinition;
}
