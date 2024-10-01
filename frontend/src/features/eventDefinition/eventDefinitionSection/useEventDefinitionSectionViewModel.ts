import { useEffect, useState } from "react";
import { DateTime } from "../../../core/services/date/DateTime";
import { EventFactory } from "../../../services/EventFactory";
import { IEvent } from "../../eventCalendar/model/IEvent";
import { eventCreator } from "../eventDefinitionItem/eventCreator";
import { IEventDefinitionSectionProps } from "./IEventDefinitionSectionProps";

export const useEventDefinitionSectionViewModel = (
  props: IEventDefinitionSectionProps
) => {
  const [from, setFrom] = useState(DateTime.getWeekStartDate(new Date()));
  const [to, setTo] = useState(DateTime.getWeekEndDate(new Date()));
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const events = EventFactory.createFromEventDefinitions(
      eventCreator,
      props.eventDefinitions,
      from,
      to
    );
    setEvents(events);
  }, [from, props.eventDefinitions, to]);

  const onReload = (from: Date, to: Date) => props.onReload?.({ from, to });

  const onDateTimeSpanChanged = (from: Date, to: Date) => {
    setFrom(from);
    setTo(to);
    onReload(from, to);
  };

  const onRegister = () => onReload(from, to);

  const onUnregister = () => onReload(from, to);

  return {
    events,
    from,
    onDateTimeSpanChanged,
    onRegister,
    onUnregister,
    to,
  };
};
