import { JSXElementConstructor, ReactElement } from "react";

export interface IChartProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  onSelectMax?: () => void;
  onSelectYear?: () => void;
}
