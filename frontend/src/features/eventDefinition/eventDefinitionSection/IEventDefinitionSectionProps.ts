import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";

export interface IEventDefinitionSectionProps {
  eventDefinitions: IEventDefinition[];
  onReload?: (dateTimeSpan: IDateTimeSpan) => void;
  userId: string;
}
