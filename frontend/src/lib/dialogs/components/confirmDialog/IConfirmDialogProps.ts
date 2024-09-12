import { ReactNode } from "react";

export interface IConfirmDialogProps {
  children?: ReactNode;
  displayCancelButton?: boolean;
  onCancel?: () => void;
  onOkay?: () => void;
  title: string;
}
