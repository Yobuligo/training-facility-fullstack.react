import { DateTime } from "../core/services/date/DateTime";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";

/**
 * This hook is responsible for rendering the time of two different dates
 */
export const useRenderTimeSpan = () => {
  const render = (dateTimeSpan: IDateTimeSpan) =>
    `${DateTime.toTime(dateTimeSpan.from)} - ${DateTime.toTime(
      dateTimeSpan.to
    )}`;
  return render;
};
