import { ReactNode } from "react";
import { HorizontalAlignment } from "../../core/ui/HorizontalAlignment";

export interface IPopoverContentProps {
  align?: HorizontalAlignment;
  children?: ReactNode;
  className?: string;
}
