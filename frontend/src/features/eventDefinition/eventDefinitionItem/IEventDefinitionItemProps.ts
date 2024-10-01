import { IEvent } from "../../eventCalendar/model/IEvent";

export interface IEventDefinitionItemProps {
  event: IEvent;
  isRegistered: boolean;
  onRegister?: () => void;
  onSelect?: (event: IEvent) => void;
  onUnregister?: () => void;
  userId: string;
}
