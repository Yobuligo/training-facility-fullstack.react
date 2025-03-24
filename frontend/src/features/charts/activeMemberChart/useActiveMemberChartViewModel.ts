import { useEffect, useState } from "react";
import { ChartView } from "../../../components/charts/chart/types/ChartView";
import { DateTime } from "../../../core/services/date/DateTime";
import { UserApi } from "../../../lib/userSession/api/UserApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IChartData } from "../../../shared/model/IChartData";

const fromStart = new Date("2024-04-01");

const getFrom = (chartView: ChartView): Date => {
  switch (chartView) {
    case ChartView.MAX: {
      return fromStart;
    }
    case ChartView.YEAR: {
      return DateTime.subtractYears(new Date(), 1);
    }
  }
};

const getTo = (chartView: ChartView): Date => {
  switch (chartView) {
    case ChartView.MAX: {
      return new Date();
    }
    case ChartView.YEAR: {
      return new Date();
    }
  }
};

export const useActiveMemberChartViewModel = () => {
  const [chartData, setChartData] = useState<IChartData | undefined>(undefined);
  const [loadStatsRequest, isLoadStatsRequestProcessing] = useRequest();
  const [chartView, setChartView] = useState(ChartView.YEAR);
  const [from, setFrom] = useState<Date>(getFrom(chartView));
  const [to, setTo] = useState<Date>(getTo(chartView));

  useEffect(() => {
    setFrom(getFrom(chartView));
    setTo(getTo(chartView));
  }, [chartView]);

  useEffect(() => {
    loadStatsRequest(async () => {
      const userApi = new UserApi();
      const chartData = await userApi.getStatsActiveUsers();

      chartData.data.forEach((chartEntry) => {
        const [year, month] = chartEntry.name.split("-");
        chartEntry.name = `${year}-${month}`;
      });

      setChartData(chartData);
    });
  }, [from, to]);

  const onSelectMax = () => setChartView(ChartView.MAX);

  const onSelectYear = () => setChartView(ChartView.YEAR);

  return {
    chartData,
    isLoadStatsRequestProcessing,
    onSelectMax,
    onSelectYear,
  };
};
