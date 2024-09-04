import { useState } from "react";
import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { useSignal } from "../../../hooks/useSignal";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { DummyEventDefinition } from "../../../model/DummyEventDefinition";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { IEvent } from "../model/IEvent";

export const useEventCalendarPlanSectionViewModel = () => {
  const [selectedEventDefinition, setSelectedEventDefinition] = useState<
    IEventDefinition | undefined
  >(undefined);
  const [reloadSignal, triggerReloadSignal] = useSignal();
  const insertEventDefinitionRequest = useRequest();
  const updateEventDefinitionRequest = useRequest();

  const onAdd = () => setSelectedEventDefinition(new DummyEventDefinition());

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
    insertEventDefinitionRequest.send(async () => {
      const eventDefinitionApi = new EventDefinitionApi();
      const createdEventDefinition = await eventDefinitionApi.insert(
        eventDefinition
      );
      eventDefinition.id = createdEventDefinition.id;
      eventDefinition.setIsPersisted();
    });

  const updateEventDefinition = (eventDefinition: IEventDefinition) =>
    updateEventDefinitionRequest.send(async () => {
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
    onSaveEventDefinition,
    reloadSignal,
    selectedEventDefinition,
  };
};
