import { Cell, Pie, PieChart as ReChartsPieChart, Tooltip } from "recharts";

import Chart from "../chart/Chart";
import { ProgressChartList } from "../progressChartList/ProgressChartList";
import { IPieChartProps } from "./IPieChartProps";
import styles from "./PieChart.module.scss";
import { usePieChartViewModel } from "./usePieChartViewModel";

/**
 * This component is responsible for rendering a pie chart.
 */
export const PieChart: React.FC<IPieChartProps> = (props) => {
  const viewModel = usePieChartViewModel(props);

  return (
    <>
      <Chart className={styles.chart} isLoading={props.isLoading}>
        <ReChartsPieChart>
          <Pie
            data={props.chartData?.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {props.chartData?.data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={viewModel.renderChartColor(index)}
              />
            ))}
          </Pie>
          <Tooltip content={viewModel.renderTooltip} />
        </ReChartsPieChart>
      </Chart>

      {props.chartData && viewModel.progressChartEntries && (
        <ProgressChartList
          progressChartEntries={viewModel.progressChartEntries}
          totalValue={viewModel.total}
        />
      )}
    </>
  );
};
