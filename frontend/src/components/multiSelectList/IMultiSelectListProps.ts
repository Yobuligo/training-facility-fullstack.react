import { ISelectOption } from "../select/ISelectOption";

export interface IMultiSelectListProps<T> {
  className?: string;
  onAdd?: (key: T) => void;
  onDelete?: (key: T) => void;
  options: ISelectOption<T>[];
  selected?: T[];
}
