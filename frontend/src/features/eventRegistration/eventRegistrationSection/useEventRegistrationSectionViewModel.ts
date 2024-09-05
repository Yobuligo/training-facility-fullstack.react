import { useEffect, useState } from "react";
import { EventInstanceApi } from "../../../api/EventInstanceApi";
import { EventRegistrationApi } from "../../../api/EventRegistrationApi";
import { List } from "../../../core/services/list/List";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IEventRegistration } from "../../../shared/model/IEventRegistration";
import { IUser } from "../../../shared/model/IUser";
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

  const [
    loadEventRegistrationRequest,
    isLoadEventRegistrationRequestProcessing,
  ] = useRequest();
  const [addEventRegistrationRequest] = useRequest();
  const [deleteEventRegistrationRequest] = useRequest();

  const loadRegistrations = async () => {
    loadEventRegistrationRequest(async () => {
      const eventRegistrationApi = new EventRegistrationApi();
      const eventRegistrations =
        await eventRegistrationApi.findByEventInstanceId(
          props.eventInstance.id
        );
      setEventRegistrations(eventRegistrations);
    });
  };

  useInitialize(() => {
    loadRegistrations();
  });

  useEffect(() => {}, [props.eventInstance.state]);

  const onAddUser = (user: IUser) => {
    // check if user is already registered, user must not be registered multiple times
    const containsUser = eventRegistrations.find(
      (eventRegistration) => eventRegistration.userId === user.id
    );
    if (containsUser) {
      return;
    }

    const eventRegistration: IEventRegistration = {
      id: uuid(),
      eventInstanceId: props.eventInstance.id,
      state: EventRegistrationState.PRESENT,
      manuallyAdded: true,
      userId: user.id,
      user: user,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setEventRegistrations((previous) => {
      previous.push(eventRegistration);
      return [...previous];
    });

    addEventRegistrationRequest(async () => {
      const eventRegistryApi = new EventRegistrationApi();
      const createdEventRegistration = await eventRegistryApi.insert(
        eventRegistration
      );
      props.eventInstance.eventRegistrations?.push(createdEventRegistration);
    });
  };

  const onDelete = (eventRegistration: IEventRegistration) => {
    setEventRegistrations((previous) => {
      List.delete(previous, (item) => item.id === eventRegistration.id);
      return [...previous];
    });

    deleteEventRegistrationRequest(async () => {
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
    isLoadEventRegistrationRequestProcessing,
    onAddUser,
    onCloseRegistration,
    onDelete,
    onReopenRegistration,
  };
};
