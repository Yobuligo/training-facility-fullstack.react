import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { IUserShort } from "../../../shared/model/IUserShort";

export interface IEventDefinitionDetailsProps {
  eventDefinition: IEventDefinition;
  onBack?: () => void;
  onDelete?: (eventDefinition: IEventDefinition) => void;
  onSave?: (eventDefinition: IEventDefinition) => void;

  /**
   * List of possible trainers
   */
  trainers: IUserShort[];
}
