import { IUserProfile } from "../../../shared/model/IUserProfile";

export interface IUserProfileProps {
  isAdminMode: boolean;
  onCancel?: (userProfile: IUserProfile) => void;  
  onChange?: (userProfile: IUserProfile) => void;
  userProfile: IUserProfile;
}
