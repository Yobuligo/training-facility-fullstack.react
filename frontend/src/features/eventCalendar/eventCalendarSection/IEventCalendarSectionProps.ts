import { ReactNode } from "react";
import { ViewsProps } from "react-big-calendar";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { ISignal } from "../../../core/services/signal/ISignal";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { ICalendarEvent } from "../model/ICalendarEvent";

export interface IEventCalendarSectionProps {
  /**
   * Loads the event definitions which should be displayed within the calendar
   */
  eventDefinitionLoader: (
    dateTimeSpan: IDateTimeSpan
  ) => Promise<IEventDefinition[]>;

  onEventSelected?: (calendarEvent: ICalendarEvent) => void;

  /**
   * Signal to trigger a reload
   */
  reloadSignal?: ISignal;

  /**
   * Renders the {@link calendarEvent} by returning the content that should be displayed
   */
  renderEvent: (calendarEvent: ICalendarEvent) => ReactNode;

  /**
   * Renders the {@link calendarEvent} style if required, uses the default otherwise
   */
  renderEventStyle?: (calendarEvent: ICalendarEvent) => React.CSSProperties;

  views?: ViewsProps<ICalendarEvent, any>;
}
