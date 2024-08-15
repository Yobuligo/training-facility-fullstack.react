import { ISignal } from "../../../core/services/signal/ISignal";
import { IUserProfile } from "../../../shared/model/IUserProfile";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IUserProfileProps extends IHaveIsAdminMode {
  cancelSignal?: ISignal;
  onCancel?: (userProfile: IUserProfile) => void;
  onChange?: (userProfile: IUserProfile) => void;
  userProfile: IUserProfile;
}
