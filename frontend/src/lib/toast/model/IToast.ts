import { IEntity } from "../../../core/api/types/IEntity";
import { ToastSeverity } from "../types/ToastSeverity";

export interface IToast extends IEntity {
  message: string;
  severity: ToastSeverity;
}
