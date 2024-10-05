import { IItem } from "../../core/types/IItem";

export interface IBurgerMenuProps {
  className?: string;
  items: IItem[];
  onEntrySelect?: (index: number) => void;
  topPosition?: number;
}
