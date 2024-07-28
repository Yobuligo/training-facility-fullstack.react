import { IUserProfile } from "../../../shared/model/IUserProfile";

export interface IUserProfileListProps {
  selected?: IUserProfile;
  onCancel?: (userProfile: IUserProfile) => void;
  onChange?: (userProfile: IUserProfile) => void;
  onSelect?: (userProfile: IUserProfile) => void;
  userProfiles: IUserProfile[];
}
