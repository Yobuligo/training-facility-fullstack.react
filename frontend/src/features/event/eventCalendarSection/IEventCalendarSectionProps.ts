import { ReactNode } from "react";
import { IEvent } from "../model/IEvent";

export interface IEventCalendarSectionProps {
  onEventSelected?: (event: IEvent) => void;

  /**
   * Renders the {@link event} by returning the content that should be displayed
   */
  renderEvent: (event: IEvent) => ReactNode;
}
