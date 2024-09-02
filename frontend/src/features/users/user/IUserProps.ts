import { ISignal } from "../../../core/services/signal/ISignal";
import { IUser } from "../../../shared/model/IUser";
import { IHaveIsAdminMode } from "../../../types/IHaveIsAdminMode";

export interface IUserProps extends IHaveIsAdminMode {
  cancelSignal?: ISignal;
  onCancel?: (user: IUser) => void;
  onChange?: (user: IUser) => void;
  user: IUser;
}
