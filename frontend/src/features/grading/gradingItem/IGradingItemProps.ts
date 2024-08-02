import { IGrading } from "../../../shared/model/IGrading";
import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IGradingItemProps extends IHaveIsAdminMode, IHaveDisplayMode {
  grading: IGrading;
  onDelete?: () => void;
}
