import { IEvent } from "../../eventCalendar/model/IEvent";

export interface IEventDefinitionItemProps {
  event: IEvent;
  isRegistered: boolean;
  onRegister?: () => void;
  onUnregister?: () => void;
  userId: string;
}
