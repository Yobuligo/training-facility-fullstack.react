import { Grade } from "../types/Grade";
import { IEntity } from "../types/IEntity";
import { IHaveUserId } from "../types/IHaveUserId";
import { IHavePath } from "./../types/IHavePath";

export interface IGrading extends IEntity, IHaveUserId {
  achievedAt: Date;
  examiners: string;
  grade: Grade;
}

export const GradingMeta: IHavePath = { path: "/gradings" };
