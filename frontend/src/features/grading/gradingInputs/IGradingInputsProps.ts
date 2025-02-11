import { Grade } from "../../../shared/types/Grade";
import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";
import { KickTechnique } from "./../../../shared/types/KickTechnique";

export interface IGradingInputsProps extends IHaveDisplayMode {
  achievedAt: Date;
  examiners: string;
  grade: Grade;
  kickTechnique: KickTechnique;
  onAchievedAtChange?: (achievedAt: Date) => void;
  onExaminersChange?: (examiners: string) => void;
  onGradeChange?: (grade: Grade) => void;
  onKickTechniqueChange?: (kickTechnique: KickTechnique) => void;
  onPlaceChange?: (place: string) => void;
  place: string;
}
