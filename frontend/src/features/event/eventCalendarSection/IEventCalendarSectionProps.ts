import { ReactNode } from "react";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { ISignal } from "../../../core/services/signal/ISignal";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { IEvent } from "../model/IEvent";

export interface IEventCalendarSectionProps {
  /**
   * Loads the event definitions which should be displayed within the calendar
   */
  eventDefinitionLoader: (
    dateTimeSpan: IDateTimeSpan
  ) => Promise<IEventDefinition[]>;
  onEventSelected?: (event: IEvent) => void;

  /**
   * Signal to trigger a reload
   */
  reloadSignal?: ISignal;

  /**
   * Renders the {@link event} by returning the content that should be displayed
   */
  renderEvent: (event: IEvent) => ReactNode;

  /**
   * Renders the {@link event} style if required, uses the default otherwise
   */
  renderEventStyle?: (event: IEvent) => React.CSSProperties;
}
