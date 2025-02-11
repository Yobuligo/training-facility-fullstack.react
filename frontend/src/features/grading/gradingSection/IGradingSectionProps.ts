import { IHaveUserId } from "../../../core/api/types/IHaveUserId";
import { IUserGrading } from "../../../shared/model/IUserGrading";
import { Grade } from "../../../shared/types/Grade";
import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";
import { KickTechnique } from "./../../../shared/types/KickTechnique";

export interface IGradingSectionProps
  extends IHaveDisplayMode,
    IHaveIsAdminMode,
    IHaveUserId {
  gradings: IUserGrading[];
  onAddGrading?: (
    achievedAt: Date,
    grade: Grade,
    kickTechnique: KickTechnique,
    place: string,
    examiners: string
  ) => void;
  onChange?: (grading: IUserGrading) => void;
  onDelete?: (grading: IUserGrading) => void;
}
