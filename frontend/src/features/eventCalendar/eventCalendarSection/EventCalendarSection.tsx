import { DateTime } from "../../../core/services/date/DateTime";
import { List } from "../../../core/services/list/List";
import { Weekday } from "../../../core/types/Weekday";
import { EventCalendar } from "../../../components/eventCalendar/EventCalendar";
import { ICalendarEvent } from "../model/ICalendarEvent";
import { IEventCalendarSectionProps } from "./IEventCalendarSectionProps";
import { useEventCalendarSectionViewModel } from "./useEventCalendarSectionViewModel";
import colors from "../../../styles/colors.module.scss";

export const EventCalendarSection: React.FC<IEventCalendarSectionProps> = (
  props
) => {
  const viewModel = useEventCalendarSectionViewModel(props);

  const styleEvent = (calendarEvent: ICalendarEvent) => {
    if (props.renderEventStyle) {
      return {
        ...props.renderEventStyle(calendarEvent),
        padding: "0.5rem",
      };
    } else {
      return {
        backgroundColor: colors.colorEventBackground,
        color: colors.colorEventText,
        padding: "0.5rem",
      };
    }
  };

  /**
   * Renders the days. Hide weekend days, if there are no events
   */
  const renderDay = (date: Date, calendarEvents: ICalendarEvent[]) => {
    const weekday = DateTime.toWeekday(date);
    if (
      (weekday === Weekday.SATURDAY || weekday === Weekday.SUNDAY) &&
      List.isEmpty(calendarEvents)
    ) {
      return { style: { display: "none" } };
    } else {
      return {};
    }
  };

  return (
    <EventCalendar
      events={viewModel.events}
      fromTime={viewModel.fromTime}
      onSelect={props.onEventSelected}
      onRangeChanged={viewModel.onEventRangeChanged}
      onViewChanged={viewModel.onViewChanged}
      renderDay={renderDay}
      renderEvent={props.renderEvent}
      styleEvent={styleEvent}
      toTime={viewModel.toTime}
      view={viewModel.view}
      views={props.views}
    />
  );
};
