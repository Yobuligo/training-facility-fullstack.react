import { DateTime } from "../core/services/date/DateTime";
import { useRenderWeekday } from "./useRenderWeekday";

/**
 * This hook is responsible for rendering a date.
 */
export const useRenderDate = () => {
  const renderWeekday = useRenderWeekday();

  const render = (date: Date, includeWeekday?: boolean): string =>
    `${
      includeWeekday ? `${renderWeekday(DateTime.toWeekday(date))} ` : ""
    }${DateTime.format(date, "dd.MM.yyyy")}`;

  return render;
};
