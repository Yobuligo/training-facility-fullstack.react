import { IEvent } from "./../../eventCalendar/model/IEvent";

export interface IEventRegistrationButtonProps<TEvent extends IEvent> {
  event: TEvent;
  isRegistered: boolean;
  onRegister?: () => void;
  onUnregister?: () => void;
  userId: string;
}
