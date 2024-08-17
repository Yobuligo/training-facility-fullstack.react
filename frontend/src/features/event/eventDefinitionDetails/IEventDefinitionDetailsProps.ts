import { IEventDefinition } from "../../../shared/model/IEventDefinition";

export interface IEventDefinitionDetailsProps {
  eventDefinition: IEventDefinition;
  onBack?: () => void;
  onSave?: (EventDefinition: IEventDefinition) => void;
}
