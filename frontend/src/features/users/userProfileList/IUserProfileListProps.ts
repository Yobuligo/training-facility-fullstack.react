import { IUserProfile } from "../../../shared/model/IUserProfile";

export interface IUserProfileListProps {
  selected?: IUserProfile;
  onSelect?: (userProfile: IUserProfile) => void;
  userProfiles: IUserProfile[];
}
