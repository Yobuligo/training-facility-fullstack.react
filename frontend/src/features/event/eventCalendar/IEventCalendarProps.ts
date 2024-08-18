import { ReactNode } from "react";
import { Event, View } from "react-big-calendar";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";

export interface IEventCalendarProps<TEvent extends Event>
  extends IDateTimeSpan {
  events: TEvent[];
  onRangeChanged?: (range: Date[] | { start: Date; end: Date }) => void;
  /**
   * Renders the {@link event} by returning the content that should be displayed
   */
  renderEvent: (event: TEvent) => ReactNode;
  view?: View;
}
