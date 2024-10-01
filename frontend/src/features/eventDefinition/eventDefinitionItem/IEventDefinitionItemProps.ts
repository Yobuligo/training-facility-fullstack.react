import { IEvent } from "../../eventCalendar/model/IEvent";

export interface IEventDefinitionItemProps {
  event: IEvent;
  isRegistered: boolean;
  userId: string;
}
