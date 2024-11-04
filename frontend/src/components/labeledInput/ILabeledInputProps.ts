import { ReactNode } from "react";

export interface ILabeledInputProps {
  autoFocus?: boolean;
  children?: ReactNode;
  className?: string;
  classNameInput?: string;
  disabled?: boolean;
  error?: string;
  infoText?: string;
  isOptional?: boolean;
  label: string;
  maxLength?: number;
  onChange?: (newValue: string) => void;
  onEnter?: () => void;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
}
