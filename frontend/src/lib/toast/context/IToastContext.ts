import { Value } from "../../../core/types/Value";
import { IToast } from "../model/IToast";

export interface IToastContext {
  toasts: Value<IToast[]>;
}
