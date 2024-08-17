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
import { IEventCalendarProps } from "./IEventCalendarProps";

const localizer = momentLocalizer(moment);

export const EventCalendar: React.FC<IEventCalendarProps> = (props) => {
  const handleRegister = (eventId: number) => {
    alert(`You registered for event with ID: ${eventId}`);
  };

  const eventStyleGetter: EventPropGetter<any> = (
    event,
    start,
    end,
    isSelected
  ) => {
    return {
      style: {
        backgroundColor: "#893F61",
        padding: "10px",
      },
    };
  };

  const customEventComponent: React.ComponentType<
    EventProps<Event>
  > = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
      <button onClick={() => handleRegister(12)}>Register</button>
    </div>
  );

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
      localizer={localizer}
      events={props.events}
      defaultView={props.view ?? "week"}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      step={15}
      timeslots={1}
      eventPropGetter={eventStyleGetter}
      components={{
        event: customEventComponent,
      }}
      culture="de"
      messages={messages}
      min={new Date(2024, 7, 16, 17, 15, 0, 0)}
      // min={props.from}
      max={new Date(2024, 7, 16, 20, 15, 0, 0)}
      // max={props.to}
      onRangeChange={props.onRangeChanged}
      views={["day", "week", "month"]}
    />
  );
};
