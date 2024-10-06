import { ReactNode } from "react";
import { EventCalendar } from "../../../components/eventCalendar/EventCalendar";
import { DateTime } from "../../../core/services/date/DateTime";
import { List } from "../../../core/services/list/List";
import { Weekday } from "../../../core/types/Weekday";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { EventInfo } from "../../../services/EventInfo";
import colors from "../../../styles/colors.module.scss";
import { EventDefinitionSection } from "../../eventDefinition/eventDefinitionSection/EventDefinitionSection";
import { EventCalendarContent } from "../eventCalendarContent/EventCalendarContent";
import { EventCalledOff } from "../eventCalledOff/EventCalledOff";
import { ICalendarEvent } from "../model/ICalendarEvent";
import { IEvent } from "../model/IEvent";
import { IEventCalendarSectionProps } from "./IEventCalendarSectionProps";
import { useEventCalendarSectionViewModel } from "./useEventCalendarSectionViewModel";

export const EventCalendarSection: React.FC<IEventCalendarSectionProps> = (
  props
) => {
  const viewModel = useEventCalendarSectionViewModel(props);
  const screenSize = useScreenSize();

  const styleEvent = (calendarEvent: ICalendarEvent) => {
    if (props.renderEventStyle) {
      return {
        ...props.renderEventStyle(calendarEvent),
        padding: "0.5rem",
      };
    } else {
      const backgroundColor = EventInfo.calledOff(calendarEvent)
        ? colors.colorEventCalledOffBackground
        : colors.colorEventBackground;
      return {
        backgroundColor: backgroundColor,
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

  const renderEvent = (event: IEvent): ReactNode =>
    EventInfo.calledOff(event) ? (
      <EventCalledOff />
    ) : (
      <>{props.renderEvent && props.renderEvent(event)}</>
    );

  const renderCalendarEvent = (event: IEvent) => (
    <EventCalendarContent eventDefinition={event.eventDefinition}>
      {renderEvent(event)}
    </EventCalendarContent>
  );

  return (
    <>
      {screenSize.isSmall() ? (
        <EventDefinitionSection
          events={viewModel.calendarEvents}
          isEventDefinitionsLoading={
            viewModel.isLoadEventDefinitionRequestProcessing
          }
          onReload={viewModel.onReload}
          onSelect={props.onEventSelected}
          renderEvent={renderEvent}
        />
      ) : (
        <EventCalendar
          events={viewModel.calendarEvents}
          fromTime={viewModel.fromTime}
          onSelect={props.onEventSelected}
          onRangeChanged={viewModel.onEventRangeChanged}
          onViewChanged={viewModel.onViewChanged}
          renderDay={renderDay}
          renderEvent={renderCalendarEvent}
          styleEvent={styleEvent}
          toTime={viewModel.toTime}
          view={viewModel.view}
          views={props.views}
        />
      )}
    </>
  );
};
