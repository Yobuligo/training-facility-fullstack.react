import { Grade } from "../types/Grade";
import { IEntity } from "../types/IEntity";

export interface IGrading extends IEntity {
  userId: string;
  grade: Grade;
  achievedAt: Date;
}
