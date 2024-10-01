import { IEvent } from "./../../eventCalendar/model/IEvent";

export interface IEventDefinitionListProps {
  events: IEvent[];
  onRegister?: () => void;
  onSelect?: (event: IEvent) => void;
  onUnregister?: () => void;
  userId: string;
}
