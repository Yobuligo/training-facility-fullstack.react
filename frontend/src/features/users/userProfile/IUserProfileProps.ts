import { ISignal } from "../../../services/signal/ISignal";
import { IUserProfile } from "../../../shared/model/IUserProfile";

export interface IUserProfileProps {
  cancelSignal?: ISignal;
  isAdminMode: boolean;
  onCancel?: (userProfile: IUserProfile) => void;
  onChange?: (userProfile: IUserProfile) => void;
  userProfile: IUserProfile;
}
