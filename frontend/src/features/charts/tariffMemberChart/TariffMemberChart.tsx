import { CSSProperties } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import Chart from "../../../components/chart/Chart";
import styles from "./TariffMemberChart.module.scss";
import { useTariffMemberChartViewModel } from "./useTariffMemberChartViewModel";

export const TariffMemberChart: React.FC = () => {
  const viewModel = useTariffMemberChartViewModel();

  const styling: CSSProperties = {
    "--fillColor": "red",
  } as CSSProperties;

  return (
    <div>
      <Chart
        className={styles.chart}
        isLoading={viewModel.isLoadStatsRequestProcessing}
      >
        <PieChart>
          <Pie
            data={viewModel.chartData?.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {viewModel.chartData?.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={viewModel.renderColor(index)} />
            ))}
          </Pie>
          <Tooltip content={viewModel.renderTooltip} />
        </PieChart>
      </Chart>

      <progress
        value={50}
        max={100}
        className={styles.progress}
        style={styling}
      />
    </div>
  );
};
