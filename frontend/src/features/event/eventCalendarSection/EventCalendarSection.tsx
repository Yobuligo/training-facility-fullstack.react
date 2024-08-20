import { EventCalendar } from "../eventCalendar/EventCalendar";
import { IEvent } from "../model/IEvent";
import { IEventCalendarSectionProps } from "./IEventCalendarSectionProps";
import { useEventCalendarSectionViewModel } from "./useEventCalendarSectionViewModel";

export const EventCalendarSection: React.FC<IEventCalendarSectionProps> = (
  props
) => {
  const viewModel = useEventCalendarSectionViewModel(props);

  const styleEvent = (event: IEvent) => {
    if (props.renderEventStyle) {
      return {
        ...props.renderEventStyle(event),
        padding: "0.5rem",
      };
    } else {
      return {
        backgroundColor: event.eventDefinition.color,
        padding: "0.5rem",
      };
    }
  };

  return (
    <EventCalendar
      events={viewModel.events}
      from={new Date()}
      onSelect={props.onEventSelected}
      onRangeChanged={viewModel.onEventRangeChanged}
      onViewChanged={viewModel.onViewChanged}
      renderEvent={props.renderEvent}
      styleEvent={styleEvent}
      to={new Date()}
      view={viewModel.view}
    />
  );
};
