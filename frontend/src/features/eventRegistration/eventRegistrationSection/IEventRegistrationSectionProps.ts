import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { IEventInstance } from "../../../shared/model/IEventInstance";

export interface IEventRegistrationSectionProps {
  eventDefinition: IEventDefinition;
  eventInstance: IEventInstance;
}
