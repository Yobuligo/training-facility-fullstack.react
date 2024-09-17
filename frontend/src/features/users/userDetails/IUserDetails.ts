import { IUser } from "../../../shared/model/IUser";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IUserDetails extends IHaveIsAdminMode {
  onBack?: (user: IUser) => void;
  onCancel?: (user: IUser) => void;
  onChange?: (user: IUser) => void;
  onDelete?: (user: IUser) => void;
  onLock?: (user: IUser) => void;
  onUnlock?: (user: IUser) => void;
  user: IUser;
}
