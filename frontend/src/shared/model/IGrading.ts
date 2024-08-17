import { Grade } from "../types/Grade";
import { IEntity } from "../types/IEntity";
import { IHaveUserId } from "../types/IHaveUserId";
import { IRouteMeta } from "../types/IRouteMeta";

export interface IGrading extends IEntity, IHaveUserId {
  achievedAt: Date;
  examiners: string;
  grade: Grade;
}

export const GradingMeta: IRouteMeta = { path: "/gradings" };
