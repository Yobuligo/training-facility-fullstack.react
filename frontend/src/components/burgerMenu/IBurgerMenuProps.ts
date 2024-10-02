export interface IBurgerMenuProps {
  className?: string;
  captions: string[];
  onEntrySelect?: (index: number) => void;
  topPosition?: number;
}
