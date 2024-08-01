import { ReactNode } from "react";

export interface IUserProfileGroupProps {
  children: ReactNode;
  collapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
  title: string;
}
