import { IHaveIsCurrentUserTrainer } from "../../../shared/types/IHaveIsCurrentUserTrainer";
import { IEventInstanceItemModel } from "./IEventInstanceItemModel";

export interface IEventInstanceItemModelAndRole
  extends IEventInstanceItemModel,
    IHaveIsCurrentUserTrainer {}
