import { ReactNode } from "react";

export interface ICardListProps {
  children: ReactNode;
  displayNumberEntries?: boolean;
  noEntriesFoundText?: string;
}
