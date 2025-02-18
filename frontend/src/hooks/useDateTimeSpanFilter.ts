import { useContext } from "react";
import { View } from "react-big-calendar";
import { AppContext } from "../context/AppContext";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { SP } from "../lib/serviceProvider/ServiceProvider";
import { DateTimeSpanFilter } from "../services/DateTimeSpanFilter";

export const useDateTimeSpanFilter = (): [
  value: IDateTimeSpan,
  setValue: (
    newValue: IDateTimeSpan | ((previous: IDateTimeSpan) => IDateTimeSpan)
  ) => void,
  updateView: (view: View) => void
] => {
  const context = useContext(AppContext);

  /**
   * Updates the default view, which is otherwise derived from AppConfig, and sets it to the given view {@link view}.
   */
  const updateView = (view: View) => {
    const dateTimeSpanFilter = SP.fetch(DateTimeSpanFilter);
    dateTimeSpanFilter.overrideView(view);
    context.dateTimeSpanFilter[1]({
      from: dateTimeSpanFilter.from,
      to: dateTimeSpanFilter.to,
    });
  };

  return [
    context.dateTimeSpanFilter[0],
    context.dateTimeSpanFilter[1],
    updateView,
  ];
};
