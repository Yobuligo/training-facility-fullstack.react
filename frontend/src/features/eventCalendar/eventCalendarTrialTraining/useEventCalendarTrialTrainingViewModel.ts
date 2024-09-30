import { useState } from "react";
import { EventInstanceApi } from "../../../api/EventInstanceApi";
import { requestToken } from "../../../api/utils/requestToken";
import { useToast } from "../../../lib/toast/hooks/useToast";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IEventInstance } from "../../../shared/model/IEventInstance";
import { EventInstanceState } from "../../../shared/types/EventInstanceState";
import { IEvent } from "../model/IEvent";

export const useEventCalendarTrialTrainingViewModel = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const [selectedEvent, setSelectedEvent] = useState<IEvent | undefined>(
    undefined
  );
  const [eventInstance, setEventInstance] = useState<
    IEventInstance | undefined
  >(undefined);
  const [fetchEventInstanceRequest, isFetchEventInstanceRequestProcessing] =
    useRequest();

  const onBack = () => {
    setSelectedEvent(undefined);
    setEventInstance(undefined);
  };

  const onBook = (event: IEvent) =>
    fetchEventInstanceRequest(async () => {
      const token = await requestToken();
      const eventInstanceApi = new EventInstanceApi();
      const eventInstance = await eventInstanceApi.insertFromEventSecured(
        event,
        token
      );
      if (eventInstance.state === EventInstanceState.CLOSED) {
        toast.warning(
          t(texts.eventCalendarTrialTraining.errorEventInstanceClosed)
        );
      } else {
        setSelectedEvent(event);
        setEventInstance(eventInstance);
      }
    });

  return {
    isFetchEventInstanceRequestProcessing,
    onBack,
    onBook,
    selectedEvent,
    eventInstance,
  };
};
