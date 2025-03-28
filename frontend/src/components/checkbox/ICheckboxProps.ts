import { ReactNode } from "react";

export interface ICheckboxProps {
  className?: string;
  isChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
  text?: ReactNode;
}
