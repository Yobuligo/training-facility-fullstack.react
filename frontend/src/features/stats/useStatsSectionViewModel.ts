import { useState } from "react";
import { DateTime } from "../../core/services/date/DateTime";
import { IDateTimeSpan } from "../../core/services/date/IDateTimeSpan";
import { useInitialize } from "../../hooks/useInitialize";
import { UserApi } from "../../lib/userSession/api/UserApi";
import { useRequest } from "../../lib/userSession/hooks/useRequest";
import { IChartData } from "../../shared/model/IChartData";

export const useStatsSectionViewModel = () => {
  const [chartData, setChartData] = useState<IChartData | undefined>(undefined);
  const [loadStats, isLoadStatsProcessing] = useRequest();

  useInitialize(() =>
    loadStats(async () => {
      const dateTimeSpan: IDateTimeSpan = {
        from: new Date("2024-04-01"),
        to: new Date(DateTime.toDate(new Date())),
      };
      const userApi = new UserApi();
      const chartData = await userApi.getStatsActiveUsers(dateTimeSpan);

      chartData.data.forEach((chartEntry) => {
        const [year, month] = chartEntry.name.split("-");
        chartEntry.name = `${year}-${month}`;
      });

      setChartData(chartData);
    })
  );

  return {
    chartData,
    isLoadStatsProcessing,
  };
};
