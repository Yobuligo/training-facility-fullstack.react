import { IHavePath } from "./../types/IHavePath";
import { Grade } from "../types/Grade";
import { IEntity } from "../types/IEntity";

export interface IGrading extends IEntity {
  userId: string;
  grade: Grade;
  achievedAt: Date;
}

export const GradingMeta: IHavePath = { path: "/gradings" };
