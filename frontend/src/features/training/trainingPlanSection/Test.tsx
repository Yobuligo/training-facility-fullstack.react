import moment from "moment";
import "moment/locale/de";
import React, { useState } from "react";
import {
  Calendar,
  EventPropGetter,
  EventProps,
  momentLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Kindertraining",
      start: new Date(2024, 7, 16, 18, 15, 0, 0),
      end: new Date(2024, 7, 16, 19, 15, 0, 0),
    },
    // Weitere Ereignisse hier
  ]);

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
    EventProps<{
      id: number;
      title: string;
      start: Date;
      end: Date;
    }>
  > = ({ event }) => (
    <div>
      <strong>{event.title}</strong>
      <button onClick={() => handleRegister(event.id)}>Register</button>
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
      events={events}
      defaultView="week"
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
      max={new Date(2024, 7, 16, 20, 15, 0, 0)}
      views={["day", "week", "month"]}
    />
  );
};

export default MyCalendar;
