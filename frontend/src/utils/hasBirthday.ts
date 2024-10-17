import { DateTime } from "../core/services/date/DateTime";

/**
 * Returns if the given {@link date} is equal to the date of today.
 */
export const hasBirthday = (date: Date | undefined): boolean => {
  if (!date) {
    return false;
  }

  const today = new Date();
  return (
    DateTime.toDay(date) === DateTime.toDay(today) &&
    DateTime.toMonth(date) === DateTime.toMonth(today)
  );
};
