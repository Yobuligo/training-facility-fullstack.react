import { IUser } from "../../../../shared/model/IUser";
import { IHaveOnSelect } from "../types/IHaveOnSelect";

export interface IUserSearchItemProps extends IHaveOnSelect {
  user: IUser;
}
