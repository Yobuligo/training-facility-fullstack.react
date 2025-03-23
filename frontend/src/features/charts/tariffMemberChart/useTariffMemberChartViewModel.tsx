import { useState } from "react";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
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
 * Converts the given {@link tariff}, which is at this point represented as string to a string,
 * which is represents by a number > 0
 */
const tariffToKeyString = (tariff: string) => {
  let key = +tariff;
  key++;
  return key.toString();
};

/**
 * Converts the given {@link keyString} to a variable of type {@link Tariff}.
 */
const keyStringToTariff = (keyString: string): Tariff =>
  keyStringToTariffOrNull(keyString) ??
  error("Error while converting key to type Tariff. Value of key is null.");

/**
 * Converts the given {@link keyString} to a variable of type {@link Tariff} or returns undefined if {@link keyString} is undefined.
 */
const keyStringToTariffOrNull = (keyString?: string): Tariff | undefined => {
  if (!keyString) {
    return;
  }

  let key = +keyString;
  key--;
  return key;
};

export const useTariffMemberChartViewModel = () => {
  const [chartData, setChartData] = useState<IChartData | undefined>(undefined);
  const [loadStatsRequest, isLoadStatsRequestProcessing] = useRequest();
  const renderTariff = useRenderTariff();

  useInitialize(() => {
    loadStatsRequest(async () => {
      const userApi = new UserApi();
      const chartData = await userApi.getStatsActiveUsersGroupedByTariff();
      chartData.data.forEach((chartEntry) => {
        chartEntry.name = tariffToKeyString(chartEntry.name);
      });
      setChartData(chartData);
    });
  });

  const renderColor = (chartEntry: IChartEntry): string => {
    const tariff = keyStringToTariff(chartEntry.name);
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
    const tariff = keyStringToTariffOrNull(
      props.payload?.[0]?.name?.toString()
    );
    if (!tariff) {
      return <></>;
    }

    const tooltip = renderTariff(tariff);
    return <div>{tooltip}</div>;
  };

  return {
    chartData,
    isLoadStatsRequestProcessing,
    renderColor,
    renderTooltip,
  };
};
