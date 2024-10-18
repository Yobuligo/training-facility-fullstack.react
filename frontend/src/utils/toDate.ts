import { DateTime } from "../core/services/date/DateTime";

/**
 * Converts the given {@link date} to a string in format dd.MM.yyyy.
 */
export const toStringDate = (date: Date | undefined): string => {
  return date ? DateTime.format(date, "dd.MM.yyyy") : "";
};
