import { IToast } from "../../model/IToast";

export interface IToastListProps {
  onClose?: (toast: IToast) => void;
  toasts: IToast[];
}
