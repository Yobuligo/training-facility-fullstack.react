import { IUserShort } from "../../../shared/model/IUserShort";

export interface IUserProfileItem {
  onSelect?: () => void;
  userShort: IUserShort;
}
