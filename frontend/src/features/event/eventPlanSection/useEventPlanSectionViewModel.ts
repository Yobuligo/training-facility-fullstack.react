import { useState } from "react";
import { Event } from "react-big-calendar";
import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { NotSupportedError } from "../../../core/errors/NotSupportedError";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";

export const useEventPlanSectionViewModel = () => {
  const [displayDetails, setDisplayDetails] = useState(false);
  const [from, setFrom] = useState<Date>();
  const [to, setTo] = useState<Date>();
  const [events, setEvents] = useState<Event[]>([]);

  const onAdd = () => setDisplayDetails(true);

  const onBack = () => setDisplayDetails(false);

  const loadEventDefinitions = async (from: Date, to: Date) => {};

  const onEventRangeChanged = (
    eventRange: Date[] | { start: Date; end: Date } | undefined
  ) => {
    if (Array.isArray(eventRange)) {
      const from = eventRange[0];
      setFrom(from);
      const to = eventRange[eventRange.length - 1];
      setTo(to);
      return;
    }

    if (typeof eventRange === "object") {
      const from = (eventRange as any).start;
      setFrom(from);
      const to = (eventRange as any).end;
      setTo(to);
      return;
    }

    throw new NotSupportedError();
  };

  const onSaveEventDefinition = async (eventDefinition: IEventDefinition) => {
    const eventDefinitionApi = new EventDefinitionApi();
    await eventDefinitionApi.insert(eventDefinition);
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
