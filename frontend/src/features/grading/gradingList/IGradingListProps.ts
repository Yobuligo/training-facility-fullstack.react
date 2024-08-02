import { IGrading } from "../../../shared/model/IGrading";
import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IGradingListProps extends IHaveIsAdminMode, IHaveDisplayMode {
  gradings: IGrading[];
  onDelete?: (grading: IGrading) => void;
}
