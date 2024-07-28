import { IUserProfile } from "../../../shared/model/IUserProfile";

export interface IUserProfileItem {
  isSelected?: boolean;
  onCancel?: () => void;
  onChange?: () => void;
  onSelect?: () => void;
  userProfile: IUserProfile;
}
