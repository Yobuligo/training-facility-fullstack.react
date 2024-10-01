import { IEvent } from "./../../eventCalendar/model/IEvent";

export interface IEventRegistrationButtonProps<TEvent extends IEvent> {
  calendarEvent: TEvent;
  isRegistered: boolean;
  onRegister?: () => void;
  onUnregister?: () => void;
  userId: string;
}
