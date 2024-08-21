import { ReactNode } from "react";
import { Event, View, ViewsProps } from "react-big-calendar";
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
   * Renders the day of {@link date} for the given {@link events}.
   * Can be used to e.g. hide days
   */
  renderDay?: (
    date: Date,
    events: TEvent[]
  ) => React.HTMLAttributes<HTMLDivElement>;

  /**
   * Styles the {@link event} by returning the css information
   */
  styleEvent?: (event: TEvent) => React.CSSProperties;
  view?: View;
  views?: ViewsProps<TEvent, any>;
}
