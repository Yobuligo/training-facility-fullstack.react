import { IGrading } from "../../../shared/model/IGrading";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IGradingListProps extends IHaveIsAdminMode {
  gradings: IGrading[];
}
