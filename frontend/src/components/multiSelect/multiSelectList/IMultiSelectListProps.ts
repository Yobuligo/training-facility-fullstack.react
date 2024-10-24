import { ISelectOption } from "../../select/ISelectOption";

export interface IMultiSelectListProps<T> {
  className?: string;
  onChange?: (selected?: T[]) => void;
  options: ISelectOption<T>[];
  selected?: T[];
}
