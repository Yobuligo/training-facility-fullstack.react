import { IUserProfile } from "../../../../shared/model/IUserProfile";
import { IHaveOnSelect } from "../types/IHaveOnSelect";

export interface IUserSearchListProps extends IHaveOnSelect {
  userProfiles: IUserProfile[];
}
