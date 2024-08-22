import { useState } from "react";
import { EventInstanceApi } from "../../../api/EventInstanceApi";
import { EventRegistrationApi } from "../../../api/EventRegistrationApi";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { useAuth } from "../../../hooks/useAuth";
import { useSession } from "../../../hooks/useSession";
import { useSignal } from "../../../hooks/useSignal";
import { EventInfo } from "../../../services/EventInfo";
import { IEventInstance } from "../../../shared/model/IEventInstance";
import { IEvent } from "../model/IEvent";

export const useEventCalendarMyTrainingsViewModel = () => {
  const [selectedEvent, setSelectedEvent] = useState<IEvent | undefined>(
    undefined
  );
  const auth = useAuth();
  const [session] = useSession();
  const [reloadSignal, triggerReloadSignal] = useSignal();

  const fetchEventInstance = async (event: IEvent): Promise<IEventInstance> => {
    const eventInstance = EventInfo.findEventInstance(event);
    if (eventInstance) {
      return eventInstance;
    } else {
      const eventInstanceApi = new EventInstanceApi();
      const eventInstance = await eventInstanceApi.insertFromEvent(event);
      return eventInstance;
    }
  };

  const onEventInstanceUnselect = () => setSelectedEvent(undefined);

  const onEventSelected = async (event: IEvent) => {
    if (auth.isAdmin()) {
      setSelectedEvent(event);
    }
  };

  const onRegister = async (event: IEvent) => {
    const eventInstance = await fetchEventInstance(event);
    const eventRegistrationApi = new EventRegistrationApi();
    await eventRegistrationApi.insertFromEventInstance(
      eventInstance,
      checkNotNull(session).userId
    );
    triggerReloadSignal();
  };

  const onUnregister = async (event: IEvent) => {
    const eventRegistration = EventInfo.findFirstEventRegistration(event);
    if (eventRegistration) {
      const eventRegistrationApi = new EventRegistrationApi();
      await eventRegistrationApi.delete(eventRegistration);
      triggerReloadSignal();
    }
  };

  return {
    onEventInstanceUnselect,
    onEventSelected,
    onRegister,
    onUnregister,
    reloadSignal,
    selectedEvent,
  };
};
