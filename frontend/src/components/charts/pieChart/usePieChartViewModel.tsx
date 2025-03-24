import { useEffect, useState } from "react";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { useRenderChartColor } from "../../../features/hooks/useRenderChartColor";
import { PopoverContent } from "../../popoverContent/PopoverContent";
import { IProgressChartEntry } from "../progressChartList/IProgressChartEntry";
import { IPieChartProps } from "./IPieChartProps";

export const usePieChartViewModel = (props: IPieChartProps) => {
  const [total, setTotal] = useState(0);
  const renderChartColor = useRenderChartColor();

  /**
   * Recalculates total entries if chart data change
   */
  useEffect(() => {
    const total = props.chartData?.data.reduce(
      (value, chartEntry) => value + chartEntry.value,
      0
    );
    setTotal(total ?? 0);
  }, [props.chartData?.data]);

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

  const progressChartEntries: IProgressChartEntry[] | undefined =
    props.chartData?.data.map((chartEntry, index) => {
      const title = props.renderTitle(chartEntry.name);
      return {
        color: renderChartColor(index),
        title,
        value: chartEntry.value,
      };
    });

  return { progressChartEntries, renderChartColor, renderTooltip, total };
};
