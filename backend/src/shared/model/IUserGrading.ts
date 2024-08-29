import { IEntity } from "../../core/api/types/IEntity";
import { IHaveUserId } from "../../core/api/types/IHaveUserId";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { Grade } from "../types/Grade";

export interface IUserGrading extends IEntity, IHaveUserId {
  achievedAt: Date;
  examiners: string;
  grade: Grade;
}

export const UserGradingMeta: IRouteMeta = { path: "/user-gradings" };
