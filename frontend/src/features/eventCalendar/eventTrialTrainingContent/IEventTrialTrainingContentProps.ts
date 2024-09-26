import { IEventDefinition } from "../../../shared/model/IEventDefinition";

export interface IEventTrialTrainingContentProps {
  eventDefinition: IEventDefinition;
  onBook?: (eventDefinition: IEventDefinition) => void;
}
