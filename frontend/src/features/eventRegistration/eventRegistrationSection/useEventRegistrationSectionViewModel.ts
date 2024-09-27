import { useEffect, useState } from "react";
import { EventInstanceApi } from "../../../api/EventInstanceApi";
import { EventRegistrationApi } from "../../../api/EventRegistrationApi";
import { UserTrialTrainingApi } from "../../../api/UserTrialTrainingApi";
import { DateTime } from "../../../core/services/date/DateTime";
import { List } from "../../../core/services/list/List";
import { isError } from "../../../core/utils/isError";
import { useInitialize } from "../../../hooks/useInitialize";
import { useConfirmDialog } from "../../../lib/dialogs/hooks/useConfirmDialog";
import { useToast } from "../../../lib/toast/hooks/useToast";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { UserInfo } from "../../../services/UserInfo";
import { IEventRegistration } from "../../../shared/model/IEventRegistration";
import { IUser } from "../../../shared/model/IUser";
import { IUserTrialTraining } from "../../../shared/model/IUserTrialTraining";
import { EventInstanceState } from "../../../shared/types/EventInstanceState";
import { EventRegistrationState } from "../../../shared/types/EventRegistrationState";
import { uuid } from "../../../utils/uuid";
import { IEventRegistrationSectionProps } from "./IEventRegistrationSectionProps";

export const useEventRegistrationSectionViewModel = (
  props: IEventRegistrationSectionProps
) => {
  const { t } = useTranslation();
  const [eventInstanceState, setEventInstanceState] = useState(
    props.eventInstance.state
  );
  const [eventRegistrations, setEventRegistrations] = useState<
    IEventRegistration[]
  >([]);
  const [userTrialTrainings, setUserTrialTrainings] = useState<
    IUserTrialTraining[]
  >([]);
  const [
    loadEventRegistrationRequest,
    isLoadEventRegistrationRequestProcessing,
  ] = useRequest();
  const [addEventRegistrationRequest] = useRequest();
  const [deleteEventRegistrationRequest] = useRequest();
  const [updateEventInstanceRequest, isUpdateEventInstanceRequestProcessing] =
    useRequest();
  const confirmDialog = useConfirmDialog();
  const toast = useToast();

  const loadRegistrations = async () => {
    loadEventRegistrationRequest(async () => {
      const eventRegistrationApi = new EventRegistrationApi();
      let eventRegistrations = await eventRegistrationApi.findByEventInstanceId(
        props.eventInstance.id
      );
      eventRegistrations = eventRegistrations.sort((left, right) =>
        DateTime.compare(left.createdAt, right.createdAt)
      );
      setEventRegistrations(eventRegistrations);

      const userTrialTrainingApi = new UserTrialTrainingApi();
      const userTrialTrainings =
        await userTrialTrainingApi.findByEventInstanceId(
          props.eventInstance.id
        );
      setUserTrialTrainings(userTrialTrainings);
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

    addEventRegistrationRequest(
      async () => {
        const eventRegistryApi = new EventRegistrationApi();
        const createdEventRegistration = await eventRegistryApi.insert(
          eventRegistration
        );

        setEventRegistrations((previous) => {
          previous.push(eventRegistration);
          return [...previous];
        });
        props.eventInstance.eventRegistrations?.push(createdEventRegistration);
      },
      (error) => {
        if (isError(error) && error.type === "UserNotFoundError") {
          toast.error(
            t(texts.eventRegistrationSection.errorUserNotFound, {
              user: UserInfo.toFullName(user),
            })
          );
          return true;
        }
        return false;
      }
    );
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

  const updateEventInstance = async () =>
    updateEventInstanceRequest(async () => {
      const eventInstanceApi = new EventInstanceApi();
      await eventInstanceApi.update(props.eventInstance);
    });

  const onCloseRegistration = () =>
    confirmDialog.show(
      t(texts.eventRegistrationSection.closeRegistrationTitle),
      t(texts.eventRegistrationSection.closeRegistrationQuestion),
      {
        onOkay: () => {
          props.eventInstance.state = EventInstanceState.CLOSED;
          setEventInstanceState(EventInstanceState.CLOSED);
          updateEventInstance();
        },
      }
    );

  const onReopenRegistration = () => {
    props.eventInstance.state = EventInstanceState.OPEN;
    setEventInstanceState(EventInstanceState.OPEN);
    updateEventInstance();
  };

  return {
    confirmDialog,
    eventInstanceState,
    eventRegistrations,
    isLoadEventRegistrationRequestProcessing,
    isUpdateEventInstanceRequestProcessing,
    onAddUser,
    onCloseRegistration,
    onDelete,
    onReopenRegistration,
    userTrialTrainings,
  };
};
