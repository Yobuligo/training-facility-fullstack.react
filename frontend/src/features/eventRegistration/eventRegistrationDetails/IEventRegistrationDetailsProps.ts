import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { IEventInstance } from "../../../shared/model/IEventInstance";

export interface IEventRegistrationDetailsProps {
  eventDefinition: IEventDefinition;
  eventInstance: IEventInstance;
  onBack?: () => void;
}
