import { ISelectOption } from "../../select/ISelectOption";

export interface IMultiSelectListProps<T> {
  className?: string;
  disabled?: boolean;
  onChange?: (selected?: T[]) => void;
  options: ISelectOption<T>[];
  selected?: T[];
}
