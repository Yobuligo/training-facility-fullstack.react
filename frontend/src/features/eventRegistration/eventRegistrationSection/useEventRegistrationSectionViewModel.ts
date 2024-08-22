import { useCallback, useEffect, useState } from "react";
import { EventInstanceApi } from "../../../api/EventInstanceApi";
import { useRequest } from "../../../hooks/useRequest";
import { IEventRegistration } from "../../../shared/model/IEventRegistration";
import { IEventRegistrationSectionProps } from "./IEventRegistrationSectionProps";

export const useEventRegistrationSectionViewModel = (
  props: IEventRegistrationSectionProps
) => {
  const [eventRegistrations, setEventRegistrations] = useState<
    IEventRegistration[]
  >([]);

  const loadEventRegistrationRequest = useRequest();

  const loadRegistrations = useCallback(async () => {
    loadEventRegistrationRequest.send(async () => {
      const eventInstanceApi = new EventInstanceApi();
      const eventRegistrations = await eventInstanceApi.findRegistrations(
        props.eventInstance.id
      );
      setEventRegistrations(eventRegistrations);
    });
  }, [loadEventRegistrationRequest, props.eventInstance]);

  useEffect(() => {
    loadRegistrations();
  }, [loadRegistrations]);

  return {
    eventRegistrations,
    loadEventRegistrationRequest,
  };
};
