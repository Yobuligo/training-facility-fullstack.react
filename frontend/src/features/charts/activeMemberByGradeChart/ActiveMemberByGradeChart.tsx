import { useState } from "react";
import { PieChart } from "../../../components/charts/pieChart/PieChart";
import { useInitialize } from "../../../hooks/useInitialize";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { UserApi } from "../../../lib/userSession/api/UserApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IChartData } from "../../../shared/model/IChartData";
import { useRenderGrade } from "../../hooks/useRenderGrade";

export const ActiveMemberByGradeChart: React.FC = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState<IChartData | undefined>(undefined);
  const [loadStatsRequest, isLoadStatsRequestProcessing] = useRequest();
  const renderGrade = useRenderGrade();

  useInitialize(() => {
    loadStatsRequest(async () => {
      const userApi = new UserApi();
      const chartData = await userApi.getStatsActiveUsersGroupedByGrade();
      setChartData(chartData);
    });
  });

  return (
    <PieChart
      isLoading={isLoadStatsRequestProcessing}
      renderTitle={(key) => {
        if (key === "-1") {
          return t(texts.grads.whiteBelt);
        }
        const gender = Number(key);
        return renderGrade(gender);
      }}
      chartData={chartData}
    />
  );
};
