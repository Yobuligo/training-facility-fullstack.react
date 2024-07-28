import { ISelectOption } from "../select/ISelectOption";

export interface ILabeledSelectProps<T extends ISelectOption> {
  disabled?: boolean;
  label: string;
  onSelect?: (option: T) => void;
  options: T[];
  selected?: T;
}
