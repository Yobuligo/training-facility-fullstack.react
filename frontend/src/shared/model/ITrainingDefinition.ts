import { IDateTimeSpan } from "../../core/services/date/IDateTimeSpan";
import { IEntity } from "../types/IEntity";

/**
 * This interface represents a specific training, which serves as template for real trainings
 */
export interface ITrainingDefinition extends IEntity, IDateTimeSpan {
  subTitle: string;
  title: string;
}
