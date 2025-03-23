import { useState } from "react";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { PopoverContent } from "../../../components/popoverContent/PopoverContent";
import { error } from "../../../core/utils/error";
import { useInitialize } from "../../../hooks/useInitialize";
import { UserApi } from "../../../lib/userSession/api/UserApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IChartData } from "../../../shared/model/IChartData";
import { IChartEntry } from "../../../shared/model/IChartEntry";
import { Tariff } from "../../../shared/types/Tariff";
import colors from "../../../styles/colors.module.scss";
import { useRenderTariff } from "../../hooks/useRenderTariff";

/**
 * Converts the given {@link key} to a variable of type {@link Tariff}.
 */
const toTariff = (key: string): Tariff =>
  toTariffOrNull(key) ??
  error("Error while converting key to type Tariff. Value of key is null.");

/**
 * Converts the given {@link key} to a variable of type {@link Tariff} or returns undefined if {@link key} is undefined.
 */
const toTariffOrNull = (key?: string): Tariff | undefined => {
  if (key === undefined) {
    return;
  }
  let tariff = +key;
  return tariff;
};

export const useTariffMemberChartViewModel = () => {
  const [chartData, setChartData] = useState<IChartData | undefined>(undefined);
  const [loadStatsRequest, isLoadStatsRequestProcessing] = useRequest();
  const renderTariff = useRenderTariff();

  useInitialize(() => {
    loadStatsRequest(async () => {
      const userApi = new UserApi();
      const chartData = await userApi.getStatsActiveUsersGroupedByTariff();
      setChartData(chartData);
    });
  });

  const renderColor = (chartEntry: IChartEntry): string => {
    const tariff = toTariff(chartEntry.name);
    switch (tariff) {
      case Tariff.CHILDREN:
        return colors.colorChartChildren;
      case Tariff.FAMILY_1:
        return colors.colorChartFamily1;
      case Tariff.FAMILY_2:
        return colors.colorChartFamily2;
      case Tariff.FAMILY_3:
        return colors.colorChartFamily3;
      case Tariff.PRINCIPALS:
        return colors.colorChartPrincipals;
      case Tariff.RELATIVES:
        return colors.colorChartRelatives;
      case Tariff.TEENAGERS_ADULTS:
        return colors.colorChartTeenagersAdults;
      case Tariff.TRAINEES_STUDENTS_PENSIONERS:
        return colors.colorChartTraineeStudentsPensioner;
    }
  };

  const renderTooltip = (props: TooltipProps<ValueType, NameType>) => {
    const tariff = toTariffOrNull(props.payload?.[0]?.name?.toString());
    if (tariff === undefined) {
      return <></>;
    }

    const count = props.payload?.[0].value;
    const tooltip = renderTariff(tariff);
    return <PopoverContent>{`${tooltip}: ${count}`}</PopoverContent>;
  };

  return {
    chartData,
    isLoadStatsRequestProcessing,
    renderColor,
    renderTooltip,
  };
};
