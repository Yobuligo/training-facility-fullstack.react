import { IUserGrading } from "../../../shared/model/IUserGrading";
import { Grade } from "../../../shared/types/Grade";
import { IHaveUserId } from "../../../core/api/types/IHaveUserId";
import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IGradingSectionProps
  extends IHaveDisplayMode,
    IHaveIsAdminMode,
    IHaveUserId {
  gradings: IUserGrading[];
  onAddGrading?: (achievedAt: Date, grade: Grade, examiners: string) => void;
  onDelete?: (grading: IUserGrading) => void;
}
