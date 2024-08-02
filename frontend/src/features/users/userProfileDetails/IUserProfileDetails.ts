import { IUserProfile } from "../../../shared/model/IUserProfile";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IUserProfileDetails extends IHaveIsAdminMode {
  onCancel?: (userProfile: IUserProfile) => void;
  onChange?: (userProfile: IUserProfile) => void;
  userProfile: IUserProfile;
}
