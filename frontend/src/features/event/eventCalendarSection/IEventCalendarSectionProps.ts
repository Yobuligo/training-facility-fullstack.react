import { ReactNode } from "react";
import { IEvent } from "../model/IEvent";
import { ISignal } from "../../../core/services/signal/ISignal";

export interface IEventCalendarSectionProps {
  onEventSelected?: (event: IEvent) => void;

  /**
   * Signal to trigger a reload
   */
  reloadSignal?: ISignal;

  /**
   * Renders the {@link event} by returning the content that should be displayed
   */
  renderEvent: (event: IEvent) => ReactNode;
}
