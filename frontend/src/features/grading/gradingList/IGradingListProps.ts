import { IUserGrading } from "../../../shared/model/IUserGrading";
import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IGradingListProps extends IHaveIsAdminMode, IHaveDisplayMode {
  gradings: IUserGrading[];
  onDelete?: (grading: IUserGrading) => void;
}
