import { useState } from "react";
import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { useSignal } from "../../../hooks/useSignal";
import { DummyEventDefinition } from "../../../model/DummyEventDefinition";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { IEvent } from "../model/IEvent";

export const useEventPlanSectionViewModel = () => {
  const [selectedEventDefinition, setSelectedEventDefinition] = useState<
    IEventDefinition | undefined
  >(undefined);
  const [reloadSignal, triggerReloadSignal] = useSignal();

  const onAdd = () => setSelectedEventDefinition(new DummyEventDefinition());

  const onBack = () => setSelectedEventDefinition(undefined);

  const onEventSelected = (event: IEvent) =>
    setSelectedEventDefinition(event.eventDefinition);

  const onSaveEventDefinition = async (eventDefinition: IEventDefinition) => {
    const eventDefinitionApi = new EventDefinitionApi();
    if (
      eventDefinition instanceof DummyEventDefinition &&
      !eventDefinition.isPersisted
    ) {
      await eventDefinitionApi.insert(eventDefinition);
      eventDefinition.setIsPersisted();
    } else {
      await eventDefinitionApi.update(eventDefinition);
    }
    triggerReloadSignal();
  };

  return {
    onAdd,
    onBack,
    onEventSelected,
    onSaveEventDefinition,
    reloadSignal,
    selectedEventDefinition,
  };
};
