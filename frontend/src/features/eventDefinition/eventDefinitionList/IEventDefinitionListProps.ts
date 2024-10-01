import { IEvent } from "./../../eventCalendar/model/IEvent";

export interface IEventDefinitionListProps {
  events: IEvent[];
  onRegister?: () => void;
  onUnregister?: () => void;
  userId: string;
}
