import { useCallback, useEffect, useState } from "react";
import { EventInstanceApi } from "../../../api/EventInstanceApi";
import { EventRegistrationApi } from "../../../api/EventRegistrationApi";
import { List } from "../../../core/services/list/List";
import { useRequest } from "../../../hooks/useRequest";
import { IEventRegistration } from "../../../shared/model/IEventRegistration";
import { IUserProfile } from "../../../shared/model/IUserProfile";
import { EventInstanceState } from "../../../shared/types/EventInstanceState";
import { EventRegistrationState } from "../../../shared/types/EventRegistrationState";
import { uuid } from "../../../utils/uuid";
import { IEventRegistrationSectionProps } from "./IEventRegistrationSectionProps";

export const useEventRegistrationSectionViewModel = (
  props: IEventRegistrationSectionProps
) => {
  const [eventInstanceState, setEventInstanceState] = useState(
    props.eventInstance.state
  );
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

  useEffect(() => {}, [props.eventInstance.state]);

  const onAddUserProfile = (userProfile: IUserProfile) => {
    // check if user is already registered, user must not be registered multiple times
    const containsUser = eventRegistrations.find(
      (eventRegistration) => eventRegistration.userId === userProfile.userId
    );
    if (containsUser) {
      return;
    }

    const eventRegistration: IEventRegistration = {
      id: uuid(),
      eventInstanceId: props.eventInstance.id,
      eventInstance: props.eventInstance,
      state: EventRegistrationState.PRESENT,
      manuallyAdded: true,
      userId: userProfile.userId,
      userProfile: userProfile,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

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

  const updateEventInstance = async () => {
    const eventInstanceApi = new EventInstanceApi();
    await eventInstanceApi.update(props.eventInstance);
  };

  const onCloseRegistration = () => {
    props.eventInstance.state = EventInstanceState.CLOSED;
    setEventInstanceState(EventInstanceState.CLOSED);
    updateEventInstance();
  };

  const onReopenRegistration = () => {
    props.eventInstance.state = EventInstanceState.OPEN;
    setEventInstanceState(EventInstanceState.OPEN);
    updateEventInstance();
  };

  return {
    eventInstanceState,
    eventRegistrations,
    loadEventRegistrationRequest,
    onAddUserProfile,
    onCloseRegistration,
    onDelete,
    onReopenRegistration,
  };
};
