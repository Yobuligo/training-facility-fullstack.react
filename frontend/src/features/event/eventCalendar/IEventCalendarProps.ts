import { Event, View } from "react-big-calendar";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";

export interface IEventCalendarProps extends IDateTimeSpan {
  events: Event[];
  onRangeChanged?: (range: Date[] | { start: Date; end: Date }) => void;
  view?: View;
}
