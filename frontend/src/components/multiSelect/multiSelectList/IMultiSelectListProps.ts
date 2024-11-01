import { ISelectOption } from "../../select/ISelectOption";
import { IHaveOnAddNoEntry } from "../types/IHaveOnAddNoEntry";

export interface IMultiSelectListProps<T> extends IHaveOnAddNoEntry {
  className?: string;
  disabled?: boolean;
  onChange?: (selected?: T[]) => void;
  options: ISelectOption<T>[];
  selected?: T[];
}
