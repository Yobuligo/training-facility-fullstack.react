import { ReactNode } from "react";
import { IEvent } from "./../../eventCalendar/model/IEvent";

export interface IEventDefinitionListProps {
  events: IEvent[];
  onSelect?: (event: IEvent) => void;
  renderEvent?: (event: IEvent) => ReactNode;
}
