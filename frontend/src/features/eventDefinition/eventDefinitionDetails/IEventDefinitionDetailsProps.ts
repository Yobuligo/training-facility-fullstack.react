import { IEventDefinition } from "../../../shared/model/IEventDefinition";

export interface IEventDefinitionDetailsProps {
  eventDefinition: IEventDefinition;
  onBack?: () => void;
  onDelete?: (eventDefinition: IEventDefinition) => void;
  onSave?: (eventDefinition: IEventDefinition) => void;
}
