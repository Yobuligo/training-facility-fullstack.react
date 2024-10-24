import { ISelectOption } from "../../select/ISelectOption";

export interface IMultiSelectItem<T> {
  id: string;
  options: ISelectOption<T>[];
  selected: ISelectOption<T>;
}
