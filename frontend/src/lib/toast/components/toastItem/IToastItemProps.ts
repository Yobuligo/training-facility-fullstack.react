import { IToast } from "../../model/IToast";

export interface IToastItemProps {
  onClose?: (toast: IToast) => void;
  toast: IToast;
}
