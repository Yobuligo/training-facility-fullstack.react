import { ReactElement, ReactNode } from "react";

/**
 * In instance of this interface represents a dashboard content,
 * which can be accessed via a specific path
 */
export interface IDashboardContentItem {
  content: ReactNode;
  icon: ReactElement;
  needsAdmin: boolean;
  path: string;
  title: string;
}
