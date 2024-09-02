import { IUserProfileShort } from "../userProfileSection/IUserProfileShort";

export interface IUserProfileItem {
  onSelect?: () => void;
  userProfileShort: IUserProfileShort;
}
