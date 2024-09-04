import { ITabItem } from "./ITabItem";

export interface ITabStripProps {
  className?: string;
  onSelect: (tabItem: ITabItem, index: number) => void;
  selected: number;
  tabItems: ITabItem[];
}
