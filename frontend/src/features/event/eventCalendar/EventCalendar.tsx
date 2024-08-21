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
import { DateTime } from "../../../core/services/date/DateTime";
import { checkNotNull } from "../../../core/utils/checkNotNull";
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
  const handleRegister = (eventId: number) => {
    alert(`You registered for event with ID: ${eventId}`);
  };

  const eventStyleGetter: EventPropGetter<TEvent> = (
    event,
    start,
    end,
    isSelected
  ) => {
    return {
      style: props.styleEvent?.(event),
    };
  };

  const customEventComponent: React.ComponentType<EventProps<TEvent>> = ({
    event,
  }) => <>{props.renderEvent(event)}</>;

  const messages = {
    allDay: "Ganztägig",
    previous: "Zurück",
    next: "Weiter",
    today: "Heute",
    month: "Monat",
    week: "Woche",
    day: "Tag",
    agenda: "Agenda",
    date: "Datum",
    time: "Zeit",
    event: "Ereignis",
    noEventsInRange: "Keine Ereignisse in diesem Zeitraum.",
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
      max={new Date(2024, 7, 16, 22, 0, 0, 0)}
      messages={messages}
      min={new Date(2024, 7, 16, 16, 30, 0, 0)}
      onRangeChange={props.onRangeChanged}
      onSelectEvent={(event) => {
        props.onSelect?.(event);
      }}
      onView={props.onViewChanged}
      startAccessor="start"
      step={15}
      style={{ height: "75vh" }}
      timeslots={1}
      views={props.views ? props.views : ["day", "week"]}
    />
  );
}
