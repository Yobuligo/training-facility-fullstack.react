import { IEvent } from "../../eventCalendar/model/IEvent";

export interface IEventRegistrationButtonProps {
  event: IEvent;
  isRegistered: boolean;
  onRegister?: () => void;
  onUnregister?: () => void;
  userId: string;
}
