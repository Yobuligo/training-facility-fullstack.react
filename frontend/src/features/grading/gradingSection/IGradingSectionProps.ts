import { IGrading } from "../../../shared/model/IGrading";
import { IHaveDisplayMode } from "../../../types/IHaveDisplayMode";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IGradingSectionProps
  extends IHaveDisplayMode,
    IHaveIsAdminMode {
  gradings: IGrading[];
  onDelete?: (grading: IGrading) => void;
  userId: string;
}
