import {
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import Chart from "../../../components/chart/Chart";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import colors from "../../../styles/colors.module.scss";
import { useActiveMemberChartViewModel } from "./useActiveMemberChartViewModel";

export const ActiveMemberChart: React.FC = () => {
  const { t } = useTranslation();
  const viewModel = useActiveMemberChartViewModel();

  return (
    <Chart
      isLoading={viewModel.isLoadStatsRequestProcessing}
      onSelectMax={viewModel.onSelectMax}
      onSelectYear={viewModel.onSelectYear}
    >
      <LineChart
        data={viewModel.chartData?.data}
        margin={{ left: -25, right: 10, top: 10 }}
      >
        <CartesianGrid strokeDasharray="1 5" stroke={colors.colorSecondary} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Line
          type="monotone"
          dataKey="value"
          stroke={colors.colorPrimary}
          strokeWidth={1}
          dot={{ fill: colors.colorPrimary, r: 2 }}
          name={t(texts.stats.activeMembers)}
        >
          <LabelList dataKey="value" position="top" />
        </Line>
      </LineChart>
    </Chart>
  );
};
