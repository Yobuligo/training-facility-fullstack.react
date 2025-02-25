import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { IDateTimeSpan } from "../../core/services/date/IDateTimeSpan";
import { IChartEntry } from "./IChartEntry";

/**
 * An instance of this interface contains data for rendering a chart.
 */
export interface IChartData {
  dateTimeSpan: IDateTimeSpan;
  data: IChartEntry[];
}

export const ChartStatsRouteMeta: IRouteMeta = { path: "/stats" };
