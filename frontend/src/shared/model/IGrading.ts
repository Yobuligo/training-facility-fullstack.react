import { Grade } from "../types/Grade";
import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserId } from "../../core/api/types/IHaveUserId";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";

export interface IGrading extends IEntity, IHaveUserId {
  achievedAt: Date;
  examiners: string;
  grade: Grade;
}

export const GradingMeta: IRouteMeta = { path: "/gradings" };
