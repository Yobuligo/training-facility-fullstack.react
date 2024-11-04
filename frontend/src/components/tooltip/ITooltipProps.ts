import { ReactNode } from "react";
import { HorizontalAlignment } from "../../core/ui/HorizontalAlignment";

export interface ITooltipProps {
  align?: HorizontalAlignment;
  children: ReactNode;
  text: string;
}
