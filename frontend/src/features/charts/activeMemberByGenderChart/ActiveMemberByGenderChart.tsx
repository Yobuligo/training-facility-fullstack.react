import { useState } from "react";
import { PieChart } from "../../../components/charts/pieChart/PieChart";
import { useInitialize } from "../../../hooks/useInitialize";
import { UserApi } from "../../../lib/userSession/api/UserApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IChartData } from "../../../shared/model/IChartData";
import { useRenderGender } from "../../hooks/useRenderGender";

export const ActiveMemberByGenderChart: React.FC = () => {
  const [chartData, setChartData] = useState<IChartData | undefined>(undefined);
  const [loadStatsRequest, isLoadStatsRequestProcessing] = useRequest();
  const renderGender = useRenderGender();

  useInitialize(() => {
    loadStatsRequest(async () => {
      const userApi = new UserApi();
      const chartData = await userApi.getStatsActiveUsersGroupedByGender();
      setChartData(chartData);
    });
  });

  return (
    <PieChart
      isLoading={isLoadStatsRequestProcessing}
      renderTitle={(key) => {
        const gender = Number(key);
        return renderGender(gender);
      }}
      chartData={chartData}
    />
  );
};
