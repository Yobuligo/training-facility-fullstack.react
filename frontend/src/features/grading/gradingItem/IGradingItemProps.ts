import { IGrading } from "../../../shared/model/IGrading";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IGradingItemProps extends IHaveIsAdminMode {
  grading: IGrading;
}
