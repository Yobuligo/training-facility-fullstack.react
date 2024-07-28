import { IUserProfile } from "../../../shared/model/IUserProfile";

export interface IUserProfileItem {
  isSelected?: boolean;
  onChange?: () => void;
  onSelect?: () => void;
  userProfile: IUserProfile;
}
