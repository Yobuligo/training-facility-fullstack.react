import { IUserProfileShort } from "../userProfileSection/IUserProfileShort";

export interface IUserProfileListProps {
  onSelect?: (userProfileShort: IUserProfileShort) => void;
  userProfilesShort: IUserProfileShort[];
}
