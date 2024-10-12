import { Grade } from "../../../shared/types/Grade";
import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";

export interface IGradingInputsProps extends IHaveDisplayMode {
  achievedAt: Date;
  examiners: string;
  grade: Grade;
  place: string;
}
