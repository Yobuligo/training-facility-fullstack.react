import { IUserProfile } from "../../../shared/model/IUserProfile";

export interface IUserProfileProps {
  isAdminMode: boolean;
  onChange?: (userProfile: IUserProfile) => void;
  userProfile: IUserProfile;
}
