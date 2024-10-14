import { IUserGrading } from "../../../shared/model/IUserGrading";
import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IGradingListProps extends IHaveIsAdminMode, IHaveDisplayMode {
  className?: string;
  gradings: IUserGrading[];
  onChange?: (grading: IUserGrading) => void;
  onDelete?: (grading: IUserGrading) => void;
}
