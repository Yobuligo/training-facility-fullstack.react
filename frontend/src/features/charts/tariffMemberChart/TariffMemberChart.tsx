import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import Chart from "../../../components/chart/Chart";
import { useRenderTariff } from "../../hooks/useRenderTariff";
import { ProgressChart } from "../progressChart/ProgressChart";
import styles from "./TariffMemberChart.module.scss";
import { useTariffMemberChartViewModel } from "./useTariffMemberChartViewModel";

export const TariffMemberChart: React.FC = () => {
  const viewModel = useTariffMemberChartViewModel();
  const renderTariff = useRenderTariff();

  const progressCharts = viewModel.chartData?.data.map((chartEntry, index) => {
    const tariff = renderTariff(Number(chartEntry.name));
    return (
      <ProgressChart
        color={viewModel.renderColor(index)}
        title={tariff}
        totalValue={viewModel.total}
        value={chartEntry.value}
      />
    );
  });

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
          <Legend />
        </PieChart>
      </Chart>

      {viewModel.chartData && <>{progressCharts}</>}
    </div>
  );
};
