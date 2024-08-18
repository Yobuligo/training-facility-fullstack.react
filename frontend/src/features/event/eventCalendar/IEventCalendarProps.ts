import { ReactNode } from "react";
import { Event, View } from "react-big-calendar";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";

export interface IEventCalendarProps<TEvent extends Event>
  extends IDateTimeSpan {
  events: TEvent[];
  onRangeChanged?: (range: Date[] | { start: Date; end: Date }) => void;
  onSelect?: (event: TEvent) => void;

  /**
   * Is called when the view (daily, weekly, monthly, etc.) changed
   */
  onViewChanged?: (view: View) => void;

  /**
   * Renders the {@link event} by returning the content that should be displayed
   */
  renderEvent: (event: TEvent) => ReactNode;

  /**
   * Styles the {@link event} by returning the css information
   */
  styleEvent?: (event: TEvent) => React.CSSProperties;
  view?: View;
}
