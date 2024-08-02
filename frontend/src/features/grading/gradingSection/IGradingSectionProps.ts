import { IGrading } from "../../../shared/model/IGrading";
import { Grade } from "../../../shared/types/Grade";
import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IGradingSectionProps
  extends IHaveDisplayMode,
    IHaveIsAdminMode {
  gradings: IGrading[];
  onAddGrading?: (achievedAt: Date, grade: Grade, examiners: string) => void;
  onDelete?: (grading: IGrading) => void;
  userId: string;
}
