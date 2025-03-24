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
import colors from "../../../styles/colors.module.scss";
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

  const renderColor = (index: number): string => {
    switch (index) {
      case 0:
        return colors.colorChart1;
      case 1:
        return colors.colorChart2;
      case 2:
        return colors.colorChart3;
      case 3:
        return colors.colorChart4;
      case 4:
        return colors.colorChart5;
      case 5:
        return colors.colorChart6;
      case 6:
        return colors.colorChart7;
      case 7:
        return colors.colorChart8;
      default:
        throw new Error(
          "Error while rendering color. No more colors available."
        );
    }
  };

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
    renderColor,
    renderTooltip,
    total,
  };
};
