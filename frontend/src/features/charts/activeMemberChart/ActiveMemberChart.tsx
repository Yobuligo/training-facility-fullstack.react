import { useState } from "react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Chart from "../../../components/charts/chart/Chart";
import { useInitialize } from "../../../hooks/useInitialize";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { UserApi } from "../../../lib/userSession/api/UserApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IChartData } from "../../../shared/model/IChartData";
import colors from "../../../styles/colors.module.scss";

export const ActiveMemberChart: React.FC = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState<IChartData | undefined>(undefined);
  const [loadStatsRequest, isLoadStatsRequestProcessing] = useRequest();

  useInitialize(() => {
    loadStatsRequest(async () => {
      const userApi = new UserApi();
      const chartData = await userApi.getStatsActiveUsers();

      chartData.data.forEach((chartEntry) => {
        const [year, month] = chartEntry.name.split("-");
        chartEntry.name = `${year}-${month}`;
      });

      setChartData(chartData);
    });
  });

  return (
    <Chart isLoading={isLoadStatsRequestProcessing}>
      <LineChart
        data={chartData?.data}
        margin={{ left: -25, right: 10, top: 10 }}
      >
        <CartesianGrid strokeDasharray="1 5" stroke={colors.colorSecondary} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}

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
