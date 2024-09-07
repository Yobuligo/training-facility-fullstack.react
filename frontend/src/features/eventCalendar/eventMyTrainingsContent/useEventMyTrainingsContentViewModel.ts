import { EventInstanceApi } from "../../../api/EventInstanceApi";
import { EventRegistrationApi } from "../../../api/EventRegistrationApi";
import { NotSupportedError } from "../../../core/errors/NotSupportedError";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { EventInfo } from "../../../services/EventInfo";
import { IEventInstance } from "../../../shared/model/IEventInstance";
import { EventInstanceState } from "../../../shared/types/EventInstanceState";
import { IEvent } from "../model/IEvent";
import { IEventMyTrainingsContentProps } from "./IEventMyTrainingsContentProps";

export const useEventMyTrainingsContentViewModel = (
  props: IEventMyTrainingsContentProps
) => {
  const { t } = useTranslation();
  const [fetchEventInstanceRequest] = useRequest();
  const [registerRequest, isRegisterRequestProcessing] = useRequest();
  const [unregisterRequest, isUnregisterRequestProcessing] = useRequest();

  const fetchEventInstance = async (event: IEvent): Promise<IEventInstance> => {
    let eventInstance: IEventInstance;
    await fetchEventInstanceRequest(async () => {
      const cachedEventInstance = EventInfo.findEventInstance(event);
      if (cachedEventInstance) {
        eventInstance = cachedEventInstance;
      } else {
        const eventInstanceApi = new EventInstanceApi();
        eventInstance = await eventInstanceApi.insertFromEvent(event);
        eventInstance.eventDefinitionId = event.eventDefinition.id;
        if (!event.eventDefinition.eventInstances) {
          event.eventDefinition.eventInstances = [];
        }
        event.eventDefinition.eventInstances.push(eventInstance);
      }
    });

    return eventInstance!;
  };

  const onRegister = async (event: IEvent) => {
    const eventInstance = await fetchEventInstance(event);
    if (eventInstance.state === EventInstanceState.CLOSED) {
      window.alert(t(texts.eventCalendarMyTrainings.registerOnClosed));
      return;
    }

    registerRequest(async () => {
      const eventRegistrationApi = new EventRegistrationApi();
      await eventRegistrationApi.insertFromEventInstance(
        eventInstance,
        props.userId
      );
      props.onRegister?.();
    });
  };

  const onUnregister = async (event: IEvent) => {
    const eventRegistration = EventInfo.findFirstEventRegistrationByUserId(
      event,
      props.userId
    );

    if (!eventRegistration) {
      throw new NotSupportedError();
    }

    if (eventRegistration.eventInstance.state === EventInstanceState.CLOSED) {
      window.alert(t(texts.eventCalendarMyTrainings.unregisterOnClosed));
      return;
    }

    unregisterRequest(async () => {
      const eventRegistrationApi = new EventRegistrationApi();
      await eventRegistrationApi.delete(eventRegistration.instance);
      props.onUnregister?.();
    });
  };

  return {
    isRegisterRequestProcessing,
    isUnregisterRequestProcessing,
    onRegister,
    onUnregister,
  };
};
