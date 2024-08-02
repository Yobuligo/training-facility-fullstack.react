import { IUserProfile } from "../../../shared/model/IUserProfile";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IUserProfileDetails extends IHaveIsAdminMode {
  onBack?: (userProfile: IUserProfile) => void;
  onCancel?: (userProfile: IUserProfile) => void;
  onChange?: (userProfile: IUserProfile) => void;
  userProfile: IUserProfile;
}
