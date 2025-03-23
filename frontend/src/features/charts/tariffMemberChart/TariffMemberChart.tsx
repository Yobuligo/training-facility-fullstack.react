import { Cell, Pie, PieChart, Tooltip } from "recharts";
import Chart from "../../../components/chart/Chart";
import { useTariffMemberChartViewModel } from "./useTariffMemberChartViewModel";

export const TariffMemberChart: React.FC = () => {
  const viewModel = useTariffMemberChartViewModel();

  return (
    <Chart isLoading={viewModel.isLoadStatsRequestProcessing}>
      <PieChart>
        <Pie
          data={viewModel.chartData?.data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {viewModel.chartData?.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={viewModel.renderColor(entry)} />
          ))}
        </Pie>
        <Tooltip content={viewModel.renderTooltip} />
      </PieChart>
    </Chart>
  );
};
