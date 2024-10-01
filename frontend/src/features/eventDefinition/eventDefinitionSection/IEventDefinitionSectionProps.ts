import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";

export interface IEventDefinitionSectionProps {
  eventDefinitionLoader: (
    dateTimeSpan: IDateTimeSpan
  ) => Promise<IEventDefinition[]>;
  userId: string;
}
