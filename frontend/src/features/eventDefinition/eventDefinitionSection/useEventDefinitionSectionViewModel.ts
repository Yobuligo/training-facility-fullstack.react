import { useCallback, useEffect, useState } from "react";
import { DateTime } from "../../../core/services/date/DateTime";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
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
  const [loadEventDefinitionsRequest, isLoadEventDefinitionRequestProcessing] =
    useRequest();

  const loadEventDefinitions = useCallback(
    async (from: Date, to: Date) =>
      loadEventDefinitionsRequest(async () => {
        const eventDefinitions = await props.eventDefinitionLoader({
          from,
          to,
        });
        const events = EventFactory.createFromEventDefinitions(
          eventCreator,
          eventDefinitions,
          from,
          to
        );
        setEvents(events);
      }),
    [loadEventDefinitionsRequest, props]
  );

  useInitialize(() => loadEventDefinitions(from, to));

  useEffect(() => {
    loadEventDefinitions(from, to);
  }, [from, to]);

  const onDateTimeSpanChanged = (from: Date, to: Date) => {
    setFrom(from);
    setTo(to);
  };

  return {
    events,
    from,
    isLoadEventDefinitionRequestProcessing,
    onDateTimeSpanChanged,
    to,
  };
};
