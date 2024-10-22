import { IMultiSelectItem } from "../multiSelectList/IMultiSelectItem";
import { ISelectOption } from "../select/ISelectOption";

export interface IMultiSelectItemProps<T> {
  multiSelectItem: IMultiSelectItem<T>;
  onAdd?: () => void;
  onDelete?: (multiSelectItem: IMultiSelectItem<T>) => void;
  onSelect?: (
    multiSelectItem: IMultiSelectItem<T>,
    option: ISelectOption<T>
  ) => void;
  selected: ISelectOption<T>;
}
