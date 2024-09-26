import { ReactNode } from "react";

export interface ILabeledInputProps {
  children?: ReactNode;
  classNameInput?: string;
  disabled?: boolean;
  error?: string;
  isOptional?: boolean;
  label: string;
  maxLength?: number;
  onChange?: (newValue: string) => void;
  onEnter?: () => void;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
}
