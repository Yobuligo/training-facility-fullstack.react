import { ReactNode } from "react";

/**
 * In instance of this interface represents a dashboard content,
 * which can be accessed via a specific path
 */
export interface IDashboardContent {
  content: ReactNode;
  icon: ReactNode;
  needsAdmin: boolean;
  path: string;
  title: string;
}
