import { ReactNode } from "react";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { IEvent } from "../../eventCalendar/model/IEvent";

export interface IEventDefinitionSectionProps {
  eventDefinitions: IEventDefinition[];
  isEventDefinitionsLoading: boolean;
  onReload?: (dateTimeSpan: IDateTimeSpan) => void;
  onSelect?: (event: IEvent) => void;
  renderEvent?: (event: IEvent) => ReactNode;
}
