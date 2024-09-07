import { useContext } from "react";
import { List } from "../../../../core/services/list/List";
import { ToastContext } from "../../context/ToastContext";
import { IToast } from "../../model/IToast";

export const useToastSectionViewModel = () => {
  const context = useContext(ToastContext);

  const onClose = (toast: IToast) => {
    context.toasts[1]((previous) => {
      List.delete(previous, (item) => item.id === toast.id);
      return [...previous];
    });
  };

  return { onClose, toasts: context.toasts[0] };
};
