import { IHaveUserId } from "../../../core/api/types/IHaveUserId";
import { IUserGrading } from "../../../shared/model/IUserGrading";
import { Grade } from "../../../shared/types/Grade";
import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IGradingSectionProps
  extends IHaveDisplayMode,
    IHaveIsAdminMode,
    IHaveUserId {
  gradings: IUserGrading[];
  onAddGrading?: (
    achievedAt: Date,
    grade: Grade,
    place: string,
    examiners: string
  ) => void;
  onDelete?: (grading: IUserGrading) => void;
}
