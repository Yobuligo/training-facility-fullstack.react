import { useState } from "react";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { PopoverContent } from "../../../components/popoverContent/PopoverContent";
import { useInitialize } from "../../../hooks/useInitialize";
import { UserApi } from "../../../lib/userSession/api/UserApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IChartData } from "../../../shared/model/IChartData";
import { useRenderTariff } from "../../hooks/useRenderTariff";

export const useTariffMemberChartViewModel = () => {
  const [chartData, setChartData] = useState<IChartData | undefined>(undefined);
  const [loadStatsRequest, isLoadStatsRequestProcessing] = useRequest();
  const renderTariff = useRenderTariff();
  const [total, setTotal] = useState(0);

  useInitialize(() => {
    loadStatsRequest(async () => {
      const userApi = new UserApi();
      const chartData = await userApi.getStatsActiveUsersGroupedByTariff();
      setChartData(chartData);

      const total = chartData.data.reduce(
        (value, chartEntry) => value + chartEntry.value,
        0
      );
      setTotal(total);
    });
  });

  const renderTooltip = (props: TooltipProps<ValueType, NameType>) => {
    if (props.payload?.[0]?.name === undefined) {
      return <></>;
    }
    const tariff = Number(props.payload?.[0]?.name);
    const count = props.payload?.[0].value;
    const tooltip = renderTariff(tariff);
    return <PopoverContent>{`${tooltip}: ${count}`}</PopoverContent>;
  };

  return {
    chartData,
    isLoadStatsRequestProcessing,
    renderTooltip,
    total,
  };
};
