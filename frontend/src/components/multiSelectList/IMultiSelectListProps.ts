import { ISelectOption } from "../select/ISelectOption";

export interface IMultiSelectListProps<T> {
  className?: string;
  options: ISelectOption<T>[];
}
