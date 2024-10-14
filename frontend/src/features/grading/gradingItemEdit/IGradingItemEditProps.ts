import { IUserGrading } from "../../../shared/model/IUserGrading";
import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";

export interface IGradingItemEditProps extends IHaveDisplayMode {
  grading: IUserGrading;
  onChange?: (grading: IUserGrading) => void;
  onDelete?: (grading: IUserGrading) => void;
}
