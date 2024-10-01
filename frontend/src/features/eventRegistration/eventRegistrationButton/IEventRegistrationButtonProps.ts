import { ICalendarEvent } from "../../eventCalendar/model/ICalendarEvent";

export interface IEventRegistrationButtonProps {
  calendarEvent: ICalendarEvent;
  isRegistered: boolean;
  onRegister?: () => void;
  onUnregister?: () => void;
  userId: string;
}
