import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { useSignal } from "../../../hooks/useSignal";
import { useUser } from "../../../hooks/useUser";
import { UserApi } from "../../../lib/userSession/api/UserApi";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { DummyEventDefinition } from "../../../model/DummyEventDefinition";
import { ISectionRouteParams } from "../../../routes/ISectionRouteParams";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { IUserShort } from "../../../shared/model/IUserShort";
import { AuthRole } from "../../../shared/types/AuthRole";
import { ICalendarEvent } from "../model/ICalendarEvent";

export const useEventCalendarPlanSectionViewModel = () => {
  const [selectedEventDefinition, setSelectedEventDefinition] = useState<
    IEventDefinition | undefined
  >(undefined);
  const [user] = useUser();
  const [reloadSignal, triggerReloadSignal] = useSignal();
  const [insertEventDefinitionRequest] = useRequest();
  const [updateEventDefinitionRequest] = useRequest();
  const [loadEventDefinitionsRequest] = useRequest();
  const [loadEventDefinitionRequest] = useRequest();
  const [deleteEventDefinitionRequest] = useRequest();
  const [trainers, setTrainers] = useState<IUserShort[]>([]);
  const params = useParams<ISectionRouteParams>();

  const onAdd = async () => {
    // load trainers
    const userApi = new UserApi();
    const trainers = await userApi.findAllShortByRole(AuthRole.TRAINER);
    setTrainers(trainers);
    setSelectedEventDefinition(new DummyEventDefinition(user.id));
  };

  /**
   * Loads an event definition by id and sets it as selected
   */
  const loadEventDefinition = useCallback(
    (eventDefinitionId: string) => {
      loadEventDefinitionRequest(async () => {
        const eventDefinitionApi = new EventDefinitionApi();
        const eventDefinition = await eventDefinitionApi.findById(
          eventDefinitionId
        );
        setSelectedEventDefinition(eventDefinition);
      });
    },
    [loadEventDefinitionRequest]
  );

  /**
   * Loads the trainers of the given {@link eventDefinitionId}
   * and set the given {@link eventDefinition} as selected.
   */
  const loadTrainers = async (
    eventDefinitionId: string,
    eventDefinition: IEventDefinition
  ) => {
    const eventDefinitionApi = new EventDefinitionApi();
    const trainers = await eventDefinitionApi.findTrainers(eventDefinitionId);
    setTrainers(trainers);
    setSelectedEventDefinition(eventDefinition);
  };

  /**
   * Loads all event definitions by id for a specific given {@link dateTimeSpan}.
   */
  const onLoadEventDefinitions = useCallback(
    async (dateTimeSpan: IDateTimeSpan): Promise<IEventDefinition[]> => {
      let eventDefinitions: IEventDefinition[] = [];
      await loadEventDefinitionsRequest(async () => {
        const eventDefinitionApi = new EventDefinitionApi();
        eventDefinitions = await eventDefinitionApi.findByDateTimeSpan(
          dateTimeSpan
        );
      });
      return eventDefinitions;
    },
    [loadEventDefinitionsRequest]
  );

  useEffect(() => {
    if (params.itemId && !selectedEventDefinition) {
      loadEventDefinition(params.itemId);
    }
  }, [loadEventDefinition, params.itemId, selectedEventDefinition]);

  const onBack = () => {
    setTrainers([]);
    setSelectedEventDefinition(undefined);
  };

  const onDeleteEventDefinition = async (eventDefinition: IEventDefinition) =>
    deleteEventDefinitionRequest(async () => {
      if (
        !(eventDefinition instanceof DummyEventDefinition) ||
        (eventDefinition instanceof DummyEventDefinition &&
          eventDefinition.isPersisted)
      ) {
        const eventDefinitionApi = new EventDefinitionApi();
        await eventDefinitionApi.deleteById(eventDefinition.id);
      }
      setSelectedEventDefinition(undefined);
      triggerReloadSignal();
    });

  /**
   * Handles the selection of a {@link calendarEvent} by loading the trainers and setting the corresponding event definition as selected.
   */
  const onEventSelected = async (calendarEvent: ICalendarEvent) =>
    loadTrainers(
      calendarEvent.eventDefinition.id,
      calendarEvent.eventDefinition
    );

  const insertEventDefinition = (eventDefinition: DummyEventDefinition) =>
    insertEventDefinitionRequest(async () => {
      const eventDefinitionApi = new EventDefinitionApi();
      const createdEventDefinition = await eventDefinitionApi.insert(
        eventDefinition
      );
      eventDefinition.id = createdEventDefinition.id;
      eventDefinition.setIsPersisted();
    });

  const updateEventDefinition = (eventDefinition: IEventDefinition) =>
    updateEventDefinitionRequest(async () => {
      const eventDefinitionApi = new EventDefinitionApi();
      await eventDefinitionApi.update(eventDefinition);
    });

  const onSaveEventDefinition = async (eventDefinition: IEventDefinition) => {
    if (
      eventDefinition instanceof DummyEventDefinition &&
      !eventDefinition.isPersisted
    ) {
      await insertEventDefinition(eventDefinition);
    } else {
      await updateEventDefinition(eventDefinition);
    }
    triggerReloadSignal();
  };

  return {
    onAdd,
    onBack,
    onEventSelected,
    onDeleteEventDefinition,
    onLoadEventDefinitions,
    onSaveEventDefinition,
    reloadSignal,
    selectedEventDefinition,
    trainers,
  };
};
