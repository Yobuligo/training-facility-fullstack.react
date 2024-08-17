import { useEffect, useMemo, useState } from "react";
import { Event } from "react-big-calendar";
import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { NotSupportedError } from "../../../core/errors/NotSupportedError";
import { DateTime } from "../../../core/services/date/DateTime";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";

const eventDefinitionsToEvent = (
  eventDefinitions: IEventDefinition[]
): Event[] => {
  const event = eventDefinitions.map((eventDefinition) => {
    return {
      start: eventDefinition.from,
      end: eventDefinition.to,
      title: eventDefinition.title,
    };
  });
  return event;
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
    const events = eventDefinitionsToEvent(eventDefinitions);
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
