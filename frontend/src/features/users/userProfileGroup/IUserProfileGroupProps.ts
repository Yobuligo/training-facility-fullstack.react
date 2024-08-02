import { ReactNode } from "react";

export interface IUserProfileGroupProps {
  className?: string;
  children: ReactNode;
  collapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
  title: string;
}
