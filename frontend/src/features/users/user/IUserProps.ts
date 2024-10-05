import { ISignal } from "../../../core/services/signal/ISignal";
import { IUser } from "../../../shared/model/IUser";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IUserProps extends IHaveIsAdminMode {
  cancelSignal?: ISignal;
  onCancel?: (user: IUser) => void;
  onDelete?: (user: IUser) => void;
  onLock?: (user: IUser) => void;
  onSave?: (user: IUser, sendInvite: boolean) => void;
  onUnlock?: (user: IUser) => void;
  user: IUser;
}
