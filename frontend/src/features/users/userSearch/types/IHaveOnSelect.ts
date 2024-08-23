import { IUserProfile } from "../../../../shared/model/IUserProfile";

export interface IHaveOnSelect {
  onSelect?: (userProfile: IUserProfile) => void;
}
