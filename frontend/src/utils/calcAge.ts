import { DateTime } from "../core/services/date/DateTime";

/**
 * Returns the years between the current date and the given {@link birthday}.
 */
export const calcAge = (birthday: Date): number => {
  return DateTime.toYearsSince(new Date(), birthday);
};
