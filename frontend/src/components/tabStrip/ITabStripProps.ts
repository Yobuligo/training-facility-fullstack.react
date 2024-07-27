import { ITabItem } from "./ITabItem";

export interface ITabStripProps {
  tabItems: ITabItem[];
  onSelect?: (tabItem: ITabItem) => void;
}
