import { IEventInstance } from "../../../shared/model/IEventInstance";
import { IEvent } from "../../eventCalendar/model/IEvent";

export interface IEventTrialTrainingDetailsProps {
  event: IEvent;
  eventInstance: IEventInstance;
  onBack?: () => void;
}
