import { useEffect, useMemo, useState } from "react";
import { Event } from "react-big-calendar";
import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { NotSupportedError } from "../../../core/errors/NotSupportedError";
import { DateTime } from "../../../core/services/date/DateTime";
import { DateTimeIterator } from "../../../core/services/date/DateTimeIterator";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { Recurrence } from "../../../shared/types/Recurrence";

const eventDefinitionsToEvent = (
  eventDefinitions: IEventDefinition[],
  from: Date,
  to: Date
): Event[] => {
  // an EventDefinition can occur several times
  // assume an EventDefinition occurs each monday and the range is a month
  // then we have to create events for each monday

  const events: Event[] = [];

  eventDefinitions.forEach((eventDefinition) => {
    switch (eventDefinition.recurrence) {
      case Recurrence.ONCE: {
        events.push({
          start: eventDefinition.from,
          end: eventDefinition.to,
          title: eventDefinition.title,
        });
        break;
      }
      case Recurrence.WEEKLY: {
        // find weekday of EventDefinition
        const weekday = eventDefinition.from.getDay();

        // add events for each date in the range with the same weekday
        DateTimeIterator.iterate(from, to, (current) => {
          if (current.getDay() === weekday) {
            events.push({
              start: DateTime.create(
                DateTime.toDate(current),
                DateTime.toTime(eventDefinition.from)
              ),
              end: DateTime.create(
                DateTime.toDate(current),
                DateTime.toTime(eventDefinition.to)
              ),
              title: eventDefinition.title,
            });
          }
        });
        break;
      }
    }
  });
  return events;
};

export const useEventPlanSectionViewModel = () => {
  const [displayDetails, setDisplayDetails] = useState(false);
  let from: Date = useMemo(() => DateTime.getWeekStartDate(new Date()), []);
  let to: Date = useMemo(() => DateTime.getWeekEndDate(new Date()), []);
  const [events, setEvents] = useState<Event[]>([]);

  const loadEventDefinitions = async (from: Date, to: Date) => {
    const dateTimeSpan: IDateTimeSpan = { from, to };
    const eventDefinitionApi = new EventDefinitionApi();
    const eventDefinitions = await eventDefinitionApi.findByDateTimeSpan(
      dateTimeSpan
    );
    const events = eventDefinitionsToEvent(eventDefinitions, from, to);
    setEvents(events);
  };

  useEffect(() => {
    loadEventDefinitions(from, to);
  }, [from, to]);

  const onAdd = () => setDisplayDetails(true);

  const onBack = () => setDisplayDetails(false);

  const onEventRangeChanged = (
    eventRange: Date[] | { start: Date; end: Date } | undefined
  ) => {
    if (Array.isArray(eventRange)) {
      from = eventRange[0];
      to = eventRange[eventRange.length - 1];
      loadEventDefinitions(from, to);
      return;
    }

    if (typeof eventRange === "object") {
      from = (eventRange as any).start as Date;
      to = (eventRange as any).end as Date;
      loadEventDefinitions(from, to);
      return;
    }

    throw new NotSupportedError();
  };

  const onSaveEventDefinition = async (eventDefinition: IEventDefinition) => {
    const eventDefinitionApi = new EventDefinitionApi();
    await eventDefinitionApi.insert(eventDefinition);
    loadEventDefinitions(from, to);
  };

  return {
    displayDetails,
    events,
    onAdd,
    onBack,
    onEventRangeChanged,
    onSaveEventDefinition,
  };
};