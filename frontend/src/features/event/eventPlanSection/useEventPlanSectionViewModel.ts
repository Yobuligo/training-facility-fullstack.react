import { useState } from "react";
import { Event } from "react-big-calendar";
import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";

export const useEventPlanSectionViewModel = () => {
  const [displayDetails, setDisplayDetails] = useState(false);
  const [eventRange, setEventRange] = useState<
    Date[] | { start: Date; end: Date } | undefined
  >({ start: new Date(), end: new Date() });
  const [events, setEvents] = useState<Event[]>([]);

  const onAdd = () => setDisplayDetails(true);

  const onBack = () => setDisplayDetails(false);

  const onEventRangeChanged = (
    eventRange: Date[] | { start: Date; end: Date } | undefined
  ) => {
    setEventRange(eventRange);
  };

  const onSaveEventDefinition = async (eventDefinition: IEventDefinition) => {
    const eventDefinitionApi = new EventDefinitionApi();
    await eventDefinitionApi.insert(eventDefinition);
  };

  return {
    displayDetails,
    eventRange,
    events,
    onAdd,
    onBack,
    onEventRangeChanged,
    onSaveEventDefinition,
  };
};
