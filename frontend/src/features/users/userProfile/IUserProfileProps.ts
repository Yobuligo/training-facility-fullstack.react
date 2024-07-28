import { IUserProfile } from "../../../shared/model/IUserProfile";

export interface IUserProfileProps {
  isAdminMode: boolean;
  onUserProfileChange?: (userProfile: IUserProfile) => void;
  userProfile: IUserProfile;
}
