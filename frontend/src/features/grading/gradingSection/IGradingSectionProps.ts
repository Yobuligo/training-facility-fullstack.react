import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IGradingSectionProps
  extends IHaveDisplayMode,
    IHaveIsAdminMode {
  userId: string;
}
