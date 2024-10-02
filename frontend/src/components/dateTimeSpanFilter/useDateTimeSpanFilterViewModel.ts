import { useEffect, useState } from "react";
import { DateTime } from "../../core/services/date/DateTime";
import { IDateTimeSpanFilterProps } from "./IDateTimeSpanFilterProps";

export const useDateTimeSpanFilterViewModel = (
  props: IDateTimeSpanFilterProps
) => {
  const [fromDate, setFromDate] = useState(
    props.fromDate ? DateTime.toDate(props.fromDate) : ""
  );
  const [toDate, setToDate] = useState(
    props.toDate ? DateTime.toDate(props.toDate) : ""
  );
  const now = new Date();
  const [displayTodaySpinner, setDisplayTodaySpinner] = useState(false);
  const [displayTomorrowSpinner, setDisplayTomorrowSpinner] = useState(false);
  const [displayWeekSpinner, setDisplayWeekSpinner] = useState(false);
  const [displayMonthSpinner, setDisplayMonthSpinner] = useState(false);

  const triggerOnChange = (from: Date, to: Date) => props.onChange?.(from, to);

  const resetSpinner = () => {
    setDisplayTodaySpinner(false);
    setDisplayTomorrowSpinner(false);
    setDisplayWeekSpinner(false);
    setDisplayMonthSpinner(false);
  };

  useEffect(() => {
    if (props.isLoading === false) {
      resetSpinner();
    }
  }, [props.isLoading]);

  const onClickToday = () => {
    // set inputs from and to to the current date
    setDisplayTodaySpinner(true);
    setFromDate(DateTime.toDate(now));
    setToDate(DateTime.toDate(now));
    triggerOnChange(now, now);
  };

  const onClickWeek = () => {
    // set inputs from and to to the current week span dates
    setDisplayWeekSpinner(true);
    const weekStartDate = DateTime.getWeekStartDate(now);
    const weekEndDate = DateTime.getWeekEndDate(now);
    setFromDate(DateTime.toDate(weekStartDate));
    setToDate(DateTime.toDate(weekEndDate));
    triggerOnChange(weekStartDate, weekEndDate);
  };

  const onClickMonth = () => {
    // set inputs from and to to the current month span dates
    setDisplayMonthSpinner(true);
    const monthStartDate = DateTime.getMonthStartDate(now);
    const monthEndDate = DateTime.getMonthEndDate(now);
    setFromDate(DateTime.toDate(monthStartDate));
    setToDate(DateTime.toDate(monthEndDate));
    triggerOnChange(monthStartDate, monthEndDate);
  };

  const onClickTomorrow = () => {
    // set inputs from and to to tomorrow's dates
    setDisplayTomorrowSpinner(true);
    const tomorrowsDate = DateTime.addDays(now, 1);
    const tomorrow = DateTime.toDate(tomorrowsDate);
    setFromDate(tomorrow);
    setToDate(tomorrow);
    triggerOnChange(tomorrowsDate, tomorrowsDate);
  };

  const onChangeFromDate = (newDate: string) => {
    setFromDate(newDate);
    triggerOnChange(new Date(newDate), new Date(toDate));
  };

  const onChangeToDate = (newDate: string) => {
    setToDate(newDate);
    triggerOnChange(new Date(fromDate), new Date(newDate));
  };

  return {
    displayTodaySpinner,
    displayTomorrowSpinner,
    displayWeekSpinner,
    displayMonthSpinner,
    fromDate,
    onClickMonth,
    onClickToday,
    onClickTomorrow,
    onClickWeek,
    onChangeFromDate,
    onChangeToDate,
    toDate,
  };
};
