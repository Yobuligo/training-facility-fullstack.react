import { Grade } from "../../../shared/types/Grade";
import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";

export interface IGradingAddFormProps extends IHaveDisplayMode {
  onAddGrading?: (achievedAt: Date, grade: Grade, examiners: string) => void;
}