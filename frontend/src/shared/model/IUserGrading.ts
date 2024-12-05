import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { Grade } from "../types/Grade";
import { IHaveUserProfileId } from "../types/IHaveUserProfileId";

export interface IUserGrading extends IEntity, IHaveUserProfileId {
  achievedAt: Date;
  examiners: string;
  grade: Grade;
  place: string;
}

export const UserGradingMeta: IRouteMeta = { path: "/user-gradings" };
