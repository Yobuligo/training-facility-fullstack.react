import { IMultiSelectListProps } from "../multiSelectList/IMultiSelectListProps";
import { IHaveOnAddNoEntry } from "../types/IHaveOnAddNoEntry";

export interface IMultiSelectSectionProps<T>
  extends IMultiSelectListProps<T>,
    IHaveOnAddNoEntry {
  label?: string;
}
