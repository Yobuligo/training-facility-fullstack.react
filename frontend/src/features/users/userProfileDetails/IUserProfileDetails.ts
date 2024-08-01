import { IUserProfile } from "../../../shared/model/IUserProfile";

export interface IUserProfileDetails {
  isAdminMode: boolean;
  onBack?: () => void;
  onCancel?: (userProfile: IUserProfile) => void;  
  onChange?: (userProfile: IUserProfile) => void;  
  userProfile: IUserProfile;
}
