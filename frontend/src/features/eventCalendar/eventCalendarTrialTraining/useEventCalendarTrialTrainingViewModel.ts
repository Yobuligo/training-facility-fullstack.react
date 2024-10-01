import { useState } from "react";
import { EventInstanceApi } from "../../../api/EventInstanceApi";
import { useTokenRequest } from "../../../hooks/useTokenRequest";
import { useToast } from "../../../lib/toast/hooks/useToast";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { IEventInstance } from "../../../shared/model/IEventInstance";
import { EventInstanceState } from "../../../shared/types/EventInstanceState";
import { ICalendarEvent } from "../model/ICalendarEvent";

export const useEventCalendarTrialTrainingViewModel = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState<
    ICalendarEvent | undefined
  >(undefined);
  const [eventInstance, setEventInstance] = useState<
    IEventInstance | undefined
  >(undefined);
  const [fetchEventInstanceRequest, isFetchEventInstanceRequestProcessing] =
    useTokenRequest();

  const onBack = () => {
    setSelectedCalendarEvent(undefined);
    setEventInstance(undefined);
  };

  const onBook = (calendarEvent: ICalendarEvent) =>
    fetchEventInstanceRequest(async () => {
      const eventInstanceApi = new EventInstanceApi();
      const eventInstance = await eventInstanceApi.insertFromEventSecured(
        calendarEvent
      );
      if (eventInstance.state === EventInstanceState.CLOSED) {
        toast.warning(
          t(texts.eventCalendarTrialTraining.errorEventInstanceClosed)
        );
      } else {
        setSelectedCalendarEvent(calendarEvent);
        setEventInstance(eventInstance);
      }
    });

  return {
    isFetchEventInstanceRequestProcessing,
    onBack,
    onBook,
    selectedEvent: selectedCalendarEvent,
    eventInstance,
  };
};
