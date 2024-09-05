import { IUser } from "../../../../shared/model/IUser";
import { IHaveOnSelect } from "../types/IHaveOnSelect";

export interface IUserSearchListProps extends IHaveOnSelect {
  users: IUser[];
}
