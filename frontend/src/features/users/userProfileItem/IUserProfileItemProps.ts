import { IUserProfile } from "../../../shared/model/IUserProfile";

export interface IUserProfileItem {
  isSelected?: boolean;
  onSelect?: () => void;
  userProfile: IUserProfile;
}
