import { JSXElementConstructor, ReactElement } from "react";

export interface IChartProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  isLoading: boolean;
  height?: number;
  onSelectMax?: () => void;
  onSelectYear?: () => void;
}
