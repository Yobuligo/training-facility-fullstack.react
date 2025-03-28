import { ReactNode } from "react";

export interface ICheckboxProps {
  isChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
  text?: ReactNode;
}
