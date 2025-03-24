import { Cell, Pie, PieChart, Tooltip } from "recharts";
import Chart from "../../../components/charts/chart/Chart";
import { IProgressChartEntry } from "../../../components/charts/progressChartList/IProgressChartEntry";
import { ProgressChartList } from "../../../components/charts/progressChartList/ProgressChartList";
import { useRenderTariff } from "../../hooks/useRenderTariff";
import styles from "./TariffMemberChart.module.scss";
import { useTariffMemberChartViewModel } from "./useTariffMemberChartViewModel";

export const TariffMemberChart: React.FC = () => {
  const viewModel = useTariffMemberChartViewModel();
  const renderTariff = useRenderTariff();

  const progressChartEntries: IProgressChartEntry[] | undefined =
    viewModel.chartData?.data.map((chartEntry, index) => {
      const tariff = renderTariff(Number(chartEntry.name));
      return {
        color: viewModel.renderColor(index),
        title: tariff,
        value: chartEntry.value,
      };
    });

  return (
    <>
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

      {viewModel.chartData && progressChartEntries && (
        <ProgressChartList
          progressChartEntries={progressChartEntries}
          totalValue={viewModel.total}
        />
      )}
    </>
  );
};
