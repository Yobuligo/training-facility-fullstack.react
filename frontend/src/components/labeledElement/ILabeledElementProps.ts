import { ReactNode } from "react";

export interface ILabeledElementProps {
  children: ReactNode;
  className?: string;
  elementId: string;
  error?: string;
  isOptional?: boolean;
  label: string;
}
