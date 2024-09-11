import { ReactNode } from "react";

export interface IConfirmDialogProps {
  children?: ReactNode;
  onCancel?: () => void;
  onOkay?: () => void;
  title: string;
}
