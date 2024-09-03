import { ReactNode } from "react";

export interface ILabeledElementProps {
  children: ReactNode;
  elementId: string;
  error?: string;
  isOptional?: boolean;
  label: string;
}
