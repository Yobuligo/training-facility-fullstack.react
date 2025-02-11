import { Grade } from "../../../shared/types/Grade";
import { KickTechnique } from "../../../shared/types/KickTechnique";
import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";

export interface IGradingAddFormProps extends IHaveDisplayMode {
  onAddGrading?: (
    achievedAt: Date,
    grade: Grade,
    kickTechnique: KickTechnique,
    place: string,
    examiners: string
  ) => void;
}
