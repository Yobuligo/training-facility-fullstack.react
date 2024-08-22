import { useCallback, useEffect, useState } from "react";
import { EventInstanceApi } from "../../../api/EventInstanceApi";
import { IEventRegistration } from "../../../shared/model/IEventRegistration";
import { IEventRegistrationSectionProps } from "./IEventRegistrationSectionProps";

export const useEventRegistrationSectionViewModel = (
  props: IEventRegistrationSectionProps
) => {
  const [eventRegistrations, setEventRegistrations] = useState<
    IEventRegistration[]
  >([]);

  const loadRegistrations = useCallback(async () => {
    if (props.eventInstance) {
      const eventInstanceApi = new EventInstanceApi();
      const eventRegistrations = await eventInstanceApi.findRegistrations(
        props.eventInstance.id
      );
      setEventRegistrations(eventRegistrations);
    }
  }, [props.eventInstance]);

  useEffect(() => {
    loadRegistrations();
  }, [loadRegistrations]);

  return {
    eventRegistrations,
  };
};
