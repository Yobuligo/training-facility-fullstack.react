import { useCallback, useEffect, useState } from "react";
import { EventInstanceApi } from "../../../api/EventInstanceApi";
import { List } from "../../../core/services/list/List";
import { useRequest } from "../../../hooks/useRequest";
import { DummyEventRegistration } from "../../../model/DummyEventRegistration";
import { IEventRegistration } from "../../../shared/model/IEventRegistration";
import { IUserProfile } from "../../../shared/model/IUserProfile";
import { EventState } from "../../../shared/types/EventState";
import { IEventRegistrationSectionProps } from "./IEventRegistrationSectionProps";
import { EventRegistrationApi } from "../../../api/EventRegistrationApi";

export const useEventRegistrationSectionViewModel = (
  props: IEventRegistrationSectionProps
) => {
  const [eventRegistrations, setEventRegistrations] = useState<
    IEventRegistration[]
  >([]);

  const loadEventRegistrationRequest = useRequest();
  const addEventRegistrationRequest = useRequest();
  const deleteEventRegistrationRequest = useRequest();

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

  const onAddUserProfile = (userProfile: IUserProfile) => {
    // check if user is already registered, user must not be registered multiple times
    const containsUser = eventRegistrations.find(
      (eventRegistration) => eventRegistration.userId === userProfile.userId
    );
    if (containsUser) {
      return;
    }

    const eventRegistration = new DummyEventRegistration(
      props.eventInstance,
      EventState.PRESENT,
      userProfile
    );

    setEventRegistrations((previous) => {
      previous.push(eventRegistration);
      return [...previous];
    });

    addEventRegistrationRequest.send(async () => {
      const eventInstanceApi = new EventInstanceApi();
      await eventInstanceApi.addEventRegistration(
        props.eventInstance,
        eventRegistration
      );
    });
  };

  const onDelete = (eventRegistration: IEventRegistration) => {
    setEventRegistrations((previous) => {
      List.delete(previous, (item) => item.id === eventRegistration.id);
      return [...previous];
    });

    deleteEventRegistrationRequest.send(async () => {
      const eventRegistrationApi = new EventRegistrationApi();
      await eventRegistrationApi.delete(eventRegistration);
    });
  };

  return {
    eventRegistrations,
    loadEventRegistrationRequest,
    onAddUserProfile,
    onDelete,
  };
};
