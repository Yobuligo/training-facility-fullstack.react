import { useEffect, useState } from "react";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { useRenderChartColor } from "../../../features/hooks/useRenderChartColor";
import { IChartData } from "../../../shared/model/IChartData";
import { PopoverContent } from "../../popoverContent/PopoverContent";
import { IProgressChartEntry } from "../progressChartList/IProgressChartEntry";
import { IPieChartProps } from "./IPieChartProps";

const calcTotal = (chartData: IChartData): number =>
  chartData.data.reduce((value, chartEntry) => value + chartEntry.value, 0);

export const usePieChartViewModel = (props: IPieChartProps) => {
  const [total, setTotal] = useState(0);
  const renderChartColor = useRenderChartColor();

  useEffect(() => {
    if (props.chartData) {
      const total = calcTotal(props.chartData);
      setTotal(total);
    }
  }, [props.chartData]);

  /**
   * Renders tooltip of pie chart pieces.
   */
  const renderTooltip = (tooltipProps: TooltipProps<ValueType, NameType>) => {
    if (tooltipProps.payload?.[0]?.name === undefined) {
      return <></>;
    }

    const tooltipText = props.renderTitle(
      tooltipProps.payload?.[0]?.name.toString()
    );
    const count = tooltipProps.payload?.[0].value;
    return <PopoverContent>{`${tooltipText}: ${count}`}</PopoverContent>;
  };

  /**
   * Returns progress chart entries.
   * Calculates the percent of each entry.
   */
  const getProgressChartEntries = (): IProgressChartEntry[] | undefined => {
    if (!props.chartData) {
      return;
    }

    const total = calcTotal(props.chartData);

    // Create progress chart entries and precalculate percent
    const progressChartEntries: IProgressChartEntry[] =
      props.chartData.data.map((chartEntry, index) => {
        const title = props.renderTitle(chartEntry.name);
        const percent = Math.round((chartEntry.value / total) * 100);
        return {
          color: renderChartColor(index),
          percent,
          title,
          value: chartEntry.value,
        };
      });

    // calculate difference between total and sum of percent (which must be equal)
    const difference =
      100 -
      progressChartEntries.reduce(
        (sum, progressChartEntry) => sum + progressChartEntry.percent,
        0
      );

    // if sum of percentage is bigger than total value, the percentage has to be distributed to the entries
    if (difference !== 0) {
      const decimals = props.chartData.data.map((chartEntry, i) => ({
        index: i,
        decimal:
          (chartEntry.value / total) * 100 -
          Math.floor((chartEntry.value / total) * 100),
      }));

      // sort by size
      decimals.sort((a, b) => b.decimal - a.decimal);

      // distribute difference
      for (let i = 0; i < Math.abs(difference); i++) {
        progressChartEntries[decimals[i].index].percent +=
          Math.sign(difference);
      }
    }

    return progressChartEntries;
  };

  return {
    progressChartEntries: getProgressChartEntries(),
    renderChartColor,
    renderTooltip,
    total,
  };
};
