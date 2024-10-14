import { IUserGrading } from "../../../shared/model/IUserGrading";
import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";

export interface IGradingItemEditProps extends IHaveDisplayMode {
  grading: IUserGrading;
  onDelete?: (grading: IUserGrading) => void;
}
