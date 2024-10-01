import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { IEvent } from "../../eventCalendar/model/IEvent";

export interface IEventDefinitionSectionProps {
  eventDefinitions: IEventDefinition[];
  onReload?: (dateTimeSpan: IDateTimeSpan) => void;
  onSelect?: (event: IEvent) => void;
  userId: string;
}
