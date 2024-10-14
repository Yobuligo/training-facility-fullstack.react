import { Grade } from "../../../shared/types/Grade";
import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";

export interface IGradingInputsProps extends IHaveDisplayMode {
  achievedAt: Date;
  examiners: string;
  grade: Grade;
  onAchievedAtChange?: (achievedAt: Date) => void;
  onExaminersChange?: (examiners: string) => void;
  onGradeChange?: (grade: Grade) => void;
  onPlaceChange?: (place: string) => void;
  place: string;
}
