export interface ILabeledInputProps {
  classNameInput?: string;
  disabled?: boolean;
  label: string;
  maxLength?: number;
  onChange?: (newValue: string) => void;
  onEnter?: () => void;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
}
