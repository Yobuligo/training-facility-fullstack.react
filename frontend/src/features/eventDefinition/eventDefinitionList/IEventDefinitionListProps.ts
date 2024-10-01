import { IEvent } from "./../../eventCalendar/model/IEvent";

export interface IEventDefinitionListProps {
  events: IEvent[];
  userId: string;
}
