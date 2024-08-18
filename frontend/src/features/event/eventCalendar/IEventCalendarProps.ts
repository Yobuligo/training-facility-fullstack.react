import { Event, View } from "react-big-calendar";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";

export interface IEventCalendarProps<TEvent extends Event>
  extends IDateTimeSpan {
  events: TEvent[];
  onRangeChanged?: (range: Date[] | { start: Date; end: Date }) => void;
  view?: View;
}
