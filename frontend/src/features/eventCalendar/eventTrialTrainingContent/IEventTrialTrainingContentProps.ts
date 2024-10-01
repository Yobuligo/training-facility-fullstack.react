import { ICalendarEvent } from "../model/ICalendarEvent";

export interface IEventTrialTrainingContentProps {
  calendarEvent: ICalendarEvent;
  onBook?: (calendarEvent: ICalendarEvent) => void;
}
