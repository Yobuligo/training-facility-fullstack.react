export interface ILabeledSwitchProps {
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  error?: string;
  infoText?: string;
  isOptional?: boolean;
  label: string;
  onChange?: (checked: boolean) => void;
}
