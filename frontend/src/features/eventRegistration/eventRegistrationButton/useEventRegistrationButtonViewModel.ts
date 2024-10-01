import { EventRegistrationApi } from "../../../api/EventRegistrationApi";
import { NotSupportedError } from "../../../core/errors/NotSupportedError";
import { useConfirmDialog } from "../../../lib/dialogs/hooks/useConfirmDialog";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { EventInfo } from "../../../services/EventInfo";
import { EventInstanceState } from "../../../shared/types/EventInstanceState";
import { useFetchEventInstance } from "../../eventCalendar/hooks/useFetchEventInstance";
import { IEvent } from "../../eventCalendar/model/IEvent";
import { IEventRegistrationButtonProps } from "./IEventRegistrationButtonProps";

export const useEventRegistrationButtonViewModel = (
  props: IEventRegistrationButtonProps
) => {
  const { t } = useTranslation();
  const [registerRequest, isRegisterRequestProcessing] = useRequest();
  const [unregisterRequest, isUnregisterRequestProcessing] = useRequest();
  const fetchEventInstance = useFetchEventInstance();
  const confirmDialog = useConfirmDialog();

  const onRegister = async (event: IEvent) => {
    const eventInstance = await fetchEventInstance(event);
    if (!eventInstance) {
      return;
    }

    if (eventInstance.state === EventInstanceState.CLOSED) {
      confirmDialog.show(
        t(texts.eventCalendarMyTrainings.registerTitle),
        t(texts.eventCalendarMyTrainings.registerOnClosed),
        { displayCancelButton: false }
      );
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
      confirmDialog.show(
        t(texts.eventCalendarMyTrainings.unregisterTitle),
        t(texts.eventCalendarMyTrainings.unregisterOnClosed),
        { displayCancelButton: false }
      );
      return;
    }

    unregisterRequest(async () => {
      const eventRegistrationApi = new EventRegistrationApi();
      await eventRegistrationApi.delete(eventRegistration.instance);
      props.onUnregister?.();
    });
  };

  return {
    confirmDialog,
    isRegisterRequestProcessing,
    isUnregisterRequestProcessing,
    onRegister,
    onUnregister,
  };
};
