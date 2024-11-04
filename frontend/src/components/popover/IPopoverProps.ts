import { ReactNode } from "react";
import { HorizontalAlignment } from "../../core/ui/HorizontalAlignment";

export interface IPopoverProps {
  align?: HorizontalAlignment;
  children?: ReactNode;
  content?: ReactNode;
}
