import { IUser } from "../../../shared/model/IUser";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IUserDetails extends IHaveIsAdminMode {
  onActivate?: (user: IUser) => void;
  onBack?: (user: IUser) => void;
  onCancel?: (user: IUser) => void;
  onChange?: (user: IUser) => void;
  onDeactivate?: (user: IUser) => void;
  onDelete?: (user: IUser) => void;
  user: IUser;
}
