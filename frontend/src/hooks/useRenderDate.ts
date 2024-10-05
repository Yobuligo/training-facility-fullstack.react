import { DateTime } from "../core/services/date/DateTime";

/**
 * This hook is responsible for rendering a date.
 */
export const useRenderDate = () => {
  const render = (date: Date): string => DateTime.format(date, "dd.MM.yyyy");
  return render;
};
