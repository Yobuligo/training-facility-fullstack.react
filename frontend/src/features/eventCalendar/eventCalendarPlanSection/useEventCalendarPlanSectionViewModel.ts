import { useCallback, useState } from "react";
import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { useSignal } from "../../../hooks/useSignal";
import { useUser } from "../../../hooks/useUser";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { DummyEventDefinition } from "../../../model/DummyEventDefinition";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { IEvent } from "../model/IEvent";

export const useEventCalendarPlanSectionViewModel = () => {
  const [selectedEventDefinition, setSelectedEventDefinition] = useState<
    IEventDefinition | undefined
  >(undefined);
  const [user] = useUser();
  const [reloadSignal, triggerReloadSignal] = useSignal();
  const [insertEventDefinitionRequest] = useRequest();
  const [updateEventDefinitionRequest] = useRequest();
  const [loadEventDefinitionRequest] = useRequest();

  const onAdd = () =>
    setSelectedEventDefinition(new DummyEventDefinition(user.id));

  const onBack = () => setSelectedEventDefinition(undefined);

  const onDeleteEventDefinition = async (eventDefinition: IEventDefinition) => {
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
  };

  const onEventSelected = (event: IEvent) =>
    setSelectedEventDefinition(event.eventDefinition);

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

  const onLoadEventDefinitions = useCallback(
    async (dateTimeSpan: IDateTimeSpan): Promise<IEventDefinition[]> => {
      let eventDefinitions: IEventDefinition[] = [];
      await loadEventDefinitionRequest(async () => {
        const eventDefinitionApi = new EventDefinitionApi();
        eventDefinitions = await eventDefinitionApi.findByDateTimeSpan(
          dateTimeSpan
        );
      });
      return eventDefinitions;
    },
    [loadEventDefinitionRequest]
  );

  return {
    onAdd,
    onBack,
    onEventSelected,
    onDeleteEventDefinition,
    onLoadEventDefinitions,
    onSaveEventDefinition,
    reloadSignal,
    selectedEventDefinition,
  };
};
