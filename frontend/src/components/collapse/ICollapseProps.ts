export interface ICollapseProps {
  className?: string;
  collapsed: boolean;
  onToggle?: (collapsed: boolean) => void;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  titleClassName?: string;
}
