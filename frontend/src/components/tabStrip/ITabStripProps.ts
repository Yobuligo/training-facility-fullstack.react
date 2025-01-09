import { ITabItem } from "./ITabItem";

export interface ITabStripProps<T extends ITabItem> {
  className?: string;
  onSelect?: (tabItem: T, index: number) => void;
  selected: number;
  tabItems: T[];
}
