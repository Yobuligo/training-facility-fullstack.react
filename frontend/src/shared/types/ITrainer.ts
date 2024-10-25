import { IHaveId } from "../../core/api/types/IHaveId";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { IHaveName } from "./IHaveName";

export interface ITrainer extends IHaveId, IHaveName {}

export const TrainerRouteMeta: IRouteMeta = { path: "/trainers" };
