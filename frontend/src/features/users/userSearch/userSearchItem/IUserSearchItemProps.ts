import { IUserProfile } from "../../../../shared/model/IUserProfile";
import { IHaveOnSelect } from "../types/IHaveOnSelect";

export interface IUserSearchItemProps extends IHaveOnSelect {
  userProfile: IUserProfile;
}
