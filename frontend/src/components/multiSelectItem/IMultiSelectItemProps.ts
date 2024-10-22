import { ISelectOption } from "../select/ISelectOption";

export interface IMultiSelectItemProps<T> {
  onAdd?: () => void;
  onDelete?: () => void;
  options: ISelectOption<T>[];
}
