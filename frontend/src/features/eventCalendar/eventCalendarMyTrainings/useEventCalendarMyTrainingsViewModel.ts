import { useState } from "react";
import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { DateTime } from "../../../core/services/date/DateTime";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { useAuth } from "../../../hooks/useAuth";
import { useSignal } from "../../../hooks/useSignal";
import { useUser } from "../../../hooks/useUser";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { IEventInstance } from "../../../shared/model/IEventInstance";
import { useFetchEventInstance } from "../hooks/useFetchEventInstance";
import { IEvent } from "../model/IEvent";

export const useEventCalendarMyTrainingsViewModel = () => {
  const [selectedEventInstance, setSelectedEventInstance] = useState<
    IEventInstance | undefined
  >(undefined);
  const auth = useAuth();
  const [user] = useUser();
  const [reloadSignal, triggerReloadSignal] = useSignal();
  const [eventDefinitions, setEventDefinitions] = useState<IEventDefinition[]>(
    []
  );
  const [loadEventDefinitionsRequest] = useRequest();
  const fetchEventInstance = useFetchEventInstance();

  const onEventInstanceUnselect = () => setSelectedEventInstance(undefined);

  const onEventSelected = async (event: IEvent) => {
    if (auth.isAdmin()) {
      const eventInstance = await fetchEventInstance(event);
      setSelectedEventInstance(eventInstance);
    }
  };

  const loadEventDefinitions = async (
    dateTimeSpan: IDateTimeSpan
  ): Promise<IEventDefinition[]> => {
    let eventDefinitions: IEventDefinition[] = [];
    await loadEventDefinitionsRequest(async () => {
      const eventDefinitionApi = new EventDefinitionApi();
      eventDefinitions = await eventDefinitionApi.findByDataTimeSpanAndUser(
        dateTimeSpan,
        user.id
      );
      const eventDefinitionsSorted = eventDefinitions.sort((left, right) =>
        DateTime.compare(left.from, right.from)
      );
      setEventDefinitions(eventDefinitionsSorted);
    });
    return eventDefinitions;
  };

  return {
    eventDefinitions,
    loadEventDefinitions,
    onEventInstanceUnselect,
    onEventSelected,
    reloadSignal,
    selectedEventInstance,
    triggerReloadSignal,
    userId: user.id,
  };
};
