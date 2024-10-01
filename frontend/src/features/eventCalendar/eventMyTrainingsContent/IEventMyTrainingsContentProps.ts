import { ICalendarEvent } from "../model/ICalendarEvent";

export interface IEventMyTrainingsContentProps {
  calendarEvent: ICalendarEvent;
  isRegistered: boolean;
  onRegister?: () => void;
  onUnregister?: () => void;
  userId: string;
}
