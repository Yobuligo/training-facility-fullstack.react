import { useState } from "react";
import { EventInstanceApi } from "../../../api/EventInstanceApi";
import { EventRegistrationApi } from "../../../api/EventRegistrationApi";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { useAuth } from "../../../hooks/useAuth";
import { useSignal } from "../../../hooks/useSignal";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { useSession } from "../../../lib/userSession/hooks/useSession";
import { EventInfo } from "../../../services/EventInfo";
import { IEventInstance } from "../../../shared/model/IEventInstance";
import { EventInstanceState } from "../../../shared/types/EventInstanceState";
import { IEvent } from "../model/IEvent";

export const useEventCalendarMyTrainingsViewModel = () => {
  const [selectedEventInstance, setSelectedEventInstance] = useState<
    IEventInstance | undefined
  >(undefined);
  const auth = useAuth();
  const [session] = useSession();
  const [reloadSignal, triggerReloadSignal] = useSignal();
  const { t } = useTranslation();

  const [fetchEventInstanceRequest] = useRequest();

  const fetchEventInstance = async (event: IEvent): Promise<IEventInstance> => {
    let eventInstance: IEventInstance;
    await fetchEventInstanceRequest(async () => {
      const cachedEventInstance = EventInfo.findEventInstance(event);
      if (cachedEventInstance) {
        eventInstance = cachedEventInstance;
      } else {
        const eventInstanceApi = new EventInstanceApi();
        eventInstance = await eventInstanceApi.insertFromEvent(event);
        eventInstance.eventDefinition = event.eventDefinition;
        eventInstance.eventDefinitionId = event.eventDefinition.id;
        if (!event.eventDefinition.eventInstances) {
          event.eventDefinition.eventInstances = [];
        }
        event.eventDefinition.eventInstances.push(eventInstance);
      }
    });

    return eventInstance!;
  };

  const onEventInstanceUnselect = () => setSelectedEventInstance(undefined);

  const onEventSelected = async (event: IEvent) => {
    if (auth.isAdmin()) {
      const eventInstance = await fetchEventInstance(event);
      setSelectedEventInstance(eventInstance);
    }
  };

  const onRegister = async (event: IEvent) => {
    const eventInstance = await fetchEventInstance(event);
    if (eventInstance.state === EventInstanceState.CLOSED) {
      window.alert(t(texts.eventCalendarMyTrainings.registerOnClosed));
      return;
    }

    const eventRegistrationApi = new EventRegistrationApi();
    await eventRegistrationApi.insertFromEventInstance(
      eventInstance,
      checkNotNull(session).userId
    );
    triggerReloadSignal();
  };

  const onUnregister = async (event: IEvent) => {
    const userId = checkNotNull(session).userId;
    const eventRegistration = EventInfo.findFirstEventRegistrationByUserId(
      event,
      userId
    );

    if (eventRegistration?.eventInstance?.state === EventInstanceState.CLOSED) {
      window.alert(t(texts.eventCalendarMyTrainings.unregisterOnClosed));
      return;
    }

    if (eventRegistration) {
      const eventRegistrationApi = new EventRegistrationApi();
      await eventRegistrationApi.delete(eventRegistration);
      triggerReloadSignal();
    }
  };

  return {
    fetchEventInstance,
    onEventInstanceUnselect,
    onEventSelected,
    onRegister,
    onUnregister,
    reloadSignal,
    selectedEventInstance,
  };
};
