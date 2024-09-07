import { useContext } from "react";
import { uuid } from "../../../utils/uuid";
import { ToastContext } from "../context/ToastContext";
import { IToast } from "../model/IToast";
import { ToastSeverity } from "../types/ToastSeverity";

export const useToast = () => {
  const context = useContext(ToastContext);

  const createToast = (message: string, severity: ToastSeverity) => {
    const toast: IToast = {
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      message,
      severity,
    };
    context.toasts[1]((previous) => {
      previous.push(toast);
      return [...previous];
    });
  };

  const error = (message: string) => createToast(message, ToastSeverity.ERROR);

  const info = (message: string) => createToast(message, ToastSeverity.INFO);

  const success = (message: string) =>
    createToast(message, ToastSeverity.SUCCESS);

  const warning = (message: string) =>
    createToast(message, ToastSeverity.WARNING);

  return { error, info, success, warning };
};
