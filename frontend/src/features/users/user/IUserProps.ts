import { ISignal } from "../../../core/services/signal/ISignal";
import { IUser } from "../../../shared/model/IUser";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IUserProps extends IHaveIsAdminMode {
  cancelSignal?: ISignal;
  onActivate?: (user: IUser) => void;
  onCancel?: (user: IUser) => void;
  onChange?: (user: IUser) => void;
  onDeactivate?: (user: IUser) => void;
  onDelete?: (user: IUser) => void;
  user: IUser;
}
