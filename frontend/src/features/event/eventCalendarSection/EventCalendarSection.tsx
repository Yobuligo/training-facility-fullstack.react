import { DateTime } from "../../../core/services/date/DateTime";
import { List } from "../../../core/services/list/List";
import { Weekday } from "../../../core/types/Weekday";
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

  /**
   * Renders the days. Hide weekend days, if there are no events
   */
  const renderDay = (date: Date, events: IEvent[]) => {
    const weekday = DateTime.toWeekday(date);
    if (
      (weekday === Weekday.SATURDAY || weekday === Weekday.SUNDAY) &&
      List.isEmpty(events)
    ) {
      return { style: { display: "none" } };
    } else {
      return {};
    }
  };

  return (
    <EventCalendar
      events={viewModel.events}
      from={new Date()}
      onSelect={props.onEventSelected}
      onRangeChanged={viewModel.onEventRangeChanged}
      onViewChanged={viewModel.onViewChanged}
      renderDay={renderDay}
      renderEvent={props.renderEvent}
      styleEvent={styleEvent}
      to={new Date()}
      view={viewModel.view}
      views={props.views}
    />
  );
};
