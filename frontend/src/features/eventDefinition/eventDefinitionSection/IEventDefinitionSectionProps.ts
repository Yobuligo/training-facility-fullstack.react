import { IEventDefinition } from "../../../shared/model/IEventDefinition";

export interface IEventDefinitionSectionProps {
  eventDefinitions: IEventDefinition[];
  userId: string;
}
