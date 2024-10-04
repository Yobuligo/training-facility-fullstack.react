import { ISelectOption } from "../select/ISelectOption";

export interface ILabeledSelectProps<T> {
  className?: string;
  disabled?: boolean;
  error?: string;
  value: T;
  isOptional?: boolean;
  label: string;
  onSelect?: (selectedValue: T) => void;
  options: ISelectOption<T>[];
}
