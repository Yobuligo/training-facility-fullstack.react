import { useState } from "react";
import { PieChart } from "../../../components/charts/pieChart/PieChart";
import { useInitialize } from "../../../hooks/useInitialize";
import { UserApi } from "../../../lib/userSession/api/UserApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IChartData } from "../../../shared/model/IChartData";
import { useRenderTariff } from "../../hooks/useRenderTariff";

export const ActiveMemberByTariffChart: React.FC = () => {
  const [chartData, setChartData] = useState<IChartData | undefined>(undefined);
  const [loadStatsRequest, isLoadStatsRequestProcessing] = useRequest();

  useInitialize(() => {
    loadStatsRequest(async () => {
      const userApi = new UserApi();
      const chartData = await userApi.getStatsActiveUsersGroupedByTariff();
      setChartData(chartData);
    });
  });
  const renderTariff = useRenderTariff();

  return (
    <PieChart
      isLoading={isLoadStatsRequestProcessing}
      renderTitle={(key) => {
        const tariff = Number(key);
        return renderTariff(tariff);
      }}
      chartData={chartData}
    />
  );
};
