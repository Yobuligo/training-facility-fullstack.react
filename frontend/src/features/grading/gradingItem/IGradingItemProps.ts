import { IUserGrading } from "../../../shared/model/IUserGrading";
import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IGradingItemProps extends IHaveIsAdminMode, IHaveDisplayMode {
  grading: IUserGrading;
  onDelete?: () => void;
}
