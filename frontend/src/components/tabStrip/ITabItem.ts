import { ReactNode } from "react";
import { IItem } from "../../core/types/IItem";

export interface ITabItem extends IItem {
  content: ReactNode;
}
