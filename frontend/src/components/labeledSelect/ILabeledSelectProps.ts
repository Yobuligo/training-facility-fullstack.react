import { ISelectOption } from "../select/ISelectOption";

export interface ILabeledSelectProps<T extends ISelectOption<any>> {
  disabled?: boolean;
  error?: string;
  isOptional?: boolean;
  label: string;
  onSelect?: (option: T) => void;
  options: T[];
  selected?: T;
}
