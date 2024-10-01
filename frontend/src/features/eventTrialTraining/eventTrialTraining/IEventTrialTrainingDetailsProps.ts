import { IEventInstance } from "../../../shared/model/IEventInstance";
import { ICalendarEvent } from "../../eventCalendar/model/ICalendarEvent";

export interface IEventTrialTrainingDetailsProps {
  calendarEvent: ICalendarEvent;
  eventInstance: IEventInstance;
  onBack?: () => void;
}
