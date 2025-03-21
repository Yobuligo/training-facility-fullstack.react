import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { EventInstanceApi } from "../../../api/EventInstanceApi";
import { DateTime } from "../../../core/services/date/DateTime";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { useAuth } from "../../../hooks/useAuth";
import { useSignal } from "../../../hooks/useSignal";
import { useUser } from "../../../hooks/useUser";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { AppRoutes } from "../../../routes/AppRoutes";
import { ISectionRouteParams } from "../../../routes/ISectionRouteParams";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { IEventInstance } from "../../../shared/model/IEventInstance";
import { IUserShort } from "../../../shared/model/IUserShort";
import { AuthRole } from "../../../shared/types/AuthRole";
import { useFetchEventInstance } from "../hooks/useFetchEventInstance";
import { IEvent } from "../model/IEvent";
import { UserApi } from "./../../../lib/userSession/api/UserApi";

export const useEventCalendarMyTrainingsViewModel = () => {
  const [selectedEventInstance, setSelectedEventInstance] = useState<
    IEventInstance | undefined
  >(undefined);
  const [selectedEventDefinition, setSelectedEventDefinition] = useState<
    IEventDefinition | undefined
  >(undefined);
  const [trainers, setTrainers] = useState<IUserShort[]>([]);
  const auth = useAuth();
  const [user] = useUser();
  const [reloadSignal, triggerReloadSignal] = useSignal();
  const [eventDefinitions, setEventDefinitions] = useState<IEventDefinition[]>(
    []
  );
  const [loadEventDefinitionsRequest, isLoadEventDefinitionRequestProcessing] =
    useRequest();
  const fetchEventInstance = useFetchEventInstance();
  const params = useParams<ISectionRouteParams>();
  const [fetchEventInstanceRequest] = useRequest();
  const navigate = useNavigate();

  /**
   * Loads an event instance by its id and sets it as selected
   */
  const loadEventInstance = useCallback(
    async (eventInstanceId: string) => {
      if (auth.isAdmin()) {
        await fetchEventInstanceRequest(async () => {
          // Load event instance
          const eventInstanceApi = new EventInstanceApi();
          const eventDefinition = await eventInstanceApi.findByEventInstanceId(
            eventInstanceId
          );

          const eventInstance = eventDefinition?.eventInstances?.find(
            (eventInstance) => eventInstance.id === eventInstanceId
          );
          if (!eventDefinition || !eventInstance) {
            return;
          }

          // load event instance trainers
          const trainers = await eventInstanceApi.findTrainers(
            eventInstance.id
          );
          setTrainers(trainers);
          setSelectedEventInstance(eventInstance);
          setSelectedEventDefinition(eventDefinition);
        });
      }
    },
    [auth, fetchEventInstanceRequest]
  );

  const resetSelection = () => {
    setSelectedEventInstance(undefined);
    setSelectedEventDefinition(undefined);
  };

  useEffect(() => {
    /**
     * Checks if a specific training was called. Navigate to error page if user is not an admin.
     */
    if (params.itemId && !auth.isAdmin()) {
      navigate(AppRoutes.error.toPath());
    }

    // Loads the event instance by the event instance id which is given via URL, if provided and no selected event instance is set
    // if the selected event instance is set, it means that the details are already displayed.
    if (params.itemId && !selectedEventInstance) {
      loadEventInstance(params.itemId);
    }

    // When the component was loaded without event instance id via URL, but the displayed event instance is still set, it means,
    // that the app user was navigating back. In that case we have to reset the selected event instance.
    if (!params.itemId && selectedEventInstance) {
      resetSelection();
    }
  }, [auth, loadEventInstance, navigate, params.itemId, selectedEventInstance]);

  const onEventInstanceUnselect = () => {
    resetSelection();
    navigate(AppRoutes.trainings.toPath());
  };

  const onEventSelected = async (event: IEvent) => {
    if (auth.isAdmin()) {
      const eventInstance = await fetchEventInstance(event);
      setSelectedEventInstance(eventInstance);

      if (eventInstance) {
        const eventInstanceApi = new EventInstanceApi();
        const trainers = await eventInstanceApi.findTrainers(eventInstance.id);
        setTrainers(trainers);
      } else {
        const userApi = new UserApi();
        const trainers = await userApi.findAllShortByRole(AuthRole.TRAINER);
        setTrainers(trainers);
      }
      setSelectedEventDefinition(event.eventDefinition);

      navigate(AppRoutes.training.toPath({ id: eventInstance.id }));
    }
  };

  const loadEventDefinitions = async (
    dateTimeSpan: IDateTimeSpan
  ): Promise<IEventDefinition[]> => {
    let eventDefinitions: IEventDefinition[] = [];
    await loadEventDefinitionsRequest(async () => {
      const eventDefinitionApi = new EventDefinitionApi();
      eventDefinitions = await eventDefinitionApi.findByDataTimeSpanAndUser(
        dateTimeSpan,
        user.id
      );
      const eventDefinitionsSorted = eventDefinitions.sort((left, right) =>
        DateTime.compare(left.from, right.from)
      );
      setEventDefinitions(eventDefinitionsSorted);
    });
    return eventDefinitions;
  };

  const showAdditionalAdminDescription = auth.isAdmin();

  const onReload = (dateTimeSpan: IDateTimeSpan) =>
    loadEventDefinitions(dateTimeSpan);

  /**
   * Returns if a loading spinner has to be displayed.
   * Display loading spinner if component was called via deep link with a specific event definition id,
   * while the event definition is not loaded yet.
   */
  const needsDisplayLoadingSpinner =
    params.itemId !== undefined && !selectedEventDefinition;

  return {
    eventDefinitions,
    isLoadEventDefinitionRequestProcessing,
    loadEventDefinitions,
    needsDisplayLoadingSpinner,
    onReload,
    onEventInstanceUnselect,
    onEventSelected,
    reloadSignal,
    selectedEventDefinition,
    selectedEventInstance,
    showAdditionalAdminDescription,
    trainers,
    triggerReloadSignal,
    userId: user.id,
  };
};
