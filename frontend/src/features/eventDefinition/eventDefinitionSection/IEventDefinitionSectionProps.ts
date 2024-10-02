import { ReactNode } from "react";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { IEvent } from "../../eventCalendar/model/IEvent";

export interface IEventDefinitionSectionProps {
  events: IEvent[];
  isEventDefinitionsLoading: boolean;
  onReload?: (dateTimeSpan: IDateTimeSpan) => void;
  onSelect?: (event: IEvent) => void;
  renderEvent?: (event: IEvent) => ReactNode;
}
