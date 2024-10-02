import { EventCalendar } from "../../../components/eventCalendar/EventCalendar";
import { DateTime } from "../../../core/services/date/DateTime";
import { List } from "../../../core/services/list/List";
import { Weekday } from "../../../core/types/Weekday";
import { useScreenSize } from "../../../hooks/useScreenSize";
import colors from "../../../styles/colors.module.scss";
import { EventDefinitionSection } from "../../eventDefinition/eventDefinitionSection/EventDefinitionSection";
import { EventContent } from "../eventContent/EventContent";
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

  const renderEvent = (event: IEvent) => (
    <EventContent eventDefinition={event.eventDefinition}>
      {props.renderEvent && props.renderEvent(event)}
    </EventContent>
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
          renderEvent={props.renderEvent}
        />
      ) : (
        <EventCalendar
          events={viewModel.calendarEvents}
          fromTime={viewModel.fromTime}
          onSelect={props.onEventSelected}
          onRangeChanged={viewModel.onEventRangeChanged}
          onViewChanged={viewModel.onViewChanged}
          renderDay={renderDay}
          renderEvent={renderEvent}
          styleEvent={styleEvent}
          toTime={viewModel.toTime}
          view={viewModel.view}
          views={props.views}
        />
      )}
    </>
  );
};
