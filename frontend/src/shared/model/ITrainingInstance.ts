import { IDateTimeSpan } from "../../core/services/date/IDateTimeSpan";
import { IEntity } from "../types/IEntity";
import { ITrainingDefinition } from "./ITrainingDefinition";

/**
 * This interface represents a specific training instance based on a training definition
 */
export interface ITrainingInstance extends IEntity, IDateTimeSpan {
  subTitle: string;
  title: string;
  trainingDefinition: ITrainingDefinition;
  trainingsDefinitionId: string;
}
