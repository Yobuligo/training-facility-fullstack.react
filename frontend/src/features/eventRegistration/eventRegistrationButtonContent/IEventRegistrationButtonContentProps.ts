import { IEvent } from "../../eventCalendar/model/IEvent";

export interface IEventRegistrationButtonContentProps {
  event: IEvent;
  isRegistered: boolean;
  onRegister?: () => void;
  onUnregister?: () => void;
  userId: string;
}
