import { IHaveIsCurrentUserTrainer } from "../types/IHaveIsCurrentUserTrainer";
import { IEventInstanceItemModel } from "./IEventInstanceItemModel";

export interface IEventInstanceItemModelAndRole
  extends IEventInstanceItemModel,
    IHaveIsCurrentUserTrainer {}
