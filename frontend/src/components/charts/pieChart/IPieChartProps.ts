import { IChartData } from "../../../shared/model/IChartData";

export interface IPieChartProps {
  chartData?: IChartData;

  /**
   * Returns if the chart data are currently loading
   */
  isLoading: boolean;

  /**
   * Renders the title from the given chart entry {@link key}.
   */
  renderTitle: (key: string) => string;
}
