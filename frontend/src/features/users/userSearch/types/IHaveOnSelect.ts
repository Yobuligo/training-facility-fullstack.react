import { IUser } from "../../../../shared/model/IUser";

export interface IHaveOnSelect {
  onSelect?: (user: IUser) => void;
}
