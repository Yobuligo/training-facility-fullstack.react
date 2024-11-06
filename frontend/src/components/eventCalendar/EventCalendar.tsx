import moment from "moment";
import "moment/locale/de";
import React from "react";
import {
  Calendar,
  Event,
  EventPropGetter,
  EventProps,
  momentLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { DateTime } from "../../core/services/date/DateTime";
import { checkNotNull } from "../../core/utils/checkNotNull";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { IEventCalendarProps } from "./IEventCalendarProps";

const localizer = momentLocalizer(moment);

const findEventsFromDate = <TEvent extends Event>(
  date: Date,
  events: TEvent[]
): TEvent[] => {
  return events.filter((event) =>
    DateTime.equalsDate(checkNotNull(event.start), date)
  );
};

export function EventCalendar<TEvent extends Event>(
  props: IEventCalendarProps<TEvent>
) {
  const { t } = useTranslation();

  const eventStyleGetter: EventPropGetter<TEvent> = (event) => {
    return {
      style: props.styleEvent?.(event),
    };
  };

  const customEventComponent: React.ComponentType<EventProps<TEvent>> = ({
    event,
  }) => <>{props.renderEvent(event)}</>;

  t(texts.calendar.allDay);
  const messages = {
    allDay: t(texts.calendar.allDay),
    previous: t(texts.calendar.previous),
    next: t(texts.calendar.next),
    today: t(texts.calendar.today),
    month: t(texts.calendar.month),
    week: t(texts.calendar.week),
    day: t(texts.calendar.day),
    agenda: t(texts.calendar.agenda),
    date: t(texts.calendar.date),
    time: t(texts.calendar.time),
    event: t(texts.calendar.event),
    noEventsInRange: t(texts.calendar.noEventsInRange),
  };

  return (
    <Calendar
      components={{
        event: customEventComponent,
      }}
      culture="de"
      dayPropGetter={(date) => {
        const events = findEventsFromDate(date, props.events);
        return {
          ...props.renderDay?.(date, events),
        };
      }}
      defaultView={props.view ?? "week"}
      endAccessor="end"
      eventPropGetter={eventStyleGetter}
      events={props.events}
      localizer={localizer}
      max={props.toTime}
      messages={messages}
      min={props.fromTime}
      onRangeChange={props.onRangeChanged}
      onSelectEvent={(event) => props.onSelect?.(event)}
      onView={props.onViewChanged}
      startAccessor="start"
      step={15}
      // style={{ height: "75vh" }}
      style={{ height: "100%" }}
      timeslots={1}
      views={props.views ? props.views : ["day", "week"]}
    />
  );
}
