import { useState } from "react";
import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { EventInstanceApi } from "../../../api/EventInstanceApi";
import { DateTime } from "../../../core/services/date/DateTime";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { useAuth } from "../../../hooks/useAuth";
import { useSignal } from "../../../hooks/useSignal";
import { useUser } from "../../../hooks/useUser";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { IEventInstance } from "../../../shared/model/IEventInstance";
import { IUserShort } from "../../../shared/model/IUserShort";
import { AuthRole } from "../../../shared/types/AuthRole";
import { useFetchEventInstance } from "../hooks/useFetchEventInstance";
import { IEvent } from "../model/IEvent";
import { UserApi } from "./../../../lib/userSession/api/UserApi";

export const useEventCalendarMyTrainingsViewModel = () => {
  const [selectedEventInstance, setSelectedEventInstance] = useState<
    IEventInstance | undefined
  >(undefined);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | undefined>(
    undefined
  );
  const [trainers, setTrainers] = useState<IUserShort[]>([]);
  const auth = useAuth();
  const [user] = useUser();
  const [reloadSignal, triggerReloadSignal] = useSignal();
  const [eventDefinitions, setEventDefinitions] = useState<IEventDefinition[]>(
    []
  );
  const [loadEventDefinitionsRequest, isLoadEventDefinitionRequestProcessing] =
    useRequest();
  const fetchEventInstance = useFetchEventInstance();

  const onEventInstanceUnselect = () => {
    setSelectedEventInstance(undefined);
    setSelectedEvent(undefined);
  };

  const onEventSelected = async (event: IEvent) => {
    if (auth.isAdmin()) {
      const eventInstance = await fetchEventInstance(event);
      setSelectedEventInstance(eventInstance);

      if (eventInstance) {
        const eventInstanceApi = new EventInstanceApi();
        const trainers = await eventInstanceApi.findTrainers(eventInstance.id);
        setTrainers(trainers);
      } else {
        const userApi = new UserApi();
        const trainers = await userApi.findAllShortByRole(AuthRole.TRAINER);
        setTrainers(trainers);
      }
      setSelectedEvent(event);
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

  const showAdditionalAdminDescription = auth.isAdmin();

  const onReload = (dateTimeSpan: IDateTimeSpan) =>
    loadEventDefinitions(dateTimeSpan);

  return {
    eventDefinitions,
    isLoadEventDefinitionRequestProcessing,
    loadEventDefinitions,
    onReload,
    onEventInstanceUnselect,
    onEventSelected,
    reloadSignal,
    selectedEvent,
    selectedEventInstance,
    showAdditionalAdminDescription,
    trainers,
    triggerReloadSignal,
    userId: user.id,
  };
};
