import { ReactNode } from "react";
import { IEvent } from "../../eventCalendar/model/IEvent";

export interface IEventDefinitionItemProps {
  event: IEvent;
  onSelect?: (event: IEvent) => void;
  renderEvent?: (event: IEvent) => ReactNode;
}
