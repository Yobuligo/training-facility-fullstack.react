import { ReactNode } from "react";

export interface ICollapseCardProps {
  className?: string;
  children: ReactNode;
  collapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
  title: string;
}
