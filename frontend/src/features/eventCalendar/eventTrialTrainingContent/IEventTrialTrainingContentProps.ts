import { IEvent } from "../model/IEvent";

export interface IEventTrialTrainingContentProps {
  event: IEvent;
  onBook?: (event: IEvent) => void;
}
