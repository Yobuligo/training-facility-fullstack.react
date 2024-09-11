import { ReactNode } from "react";

export interface IDialogProps {
  children?: ReactNode;
  footer?: ReactNode;
  title: string;
}
