import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useSignal } from "../../../hooks/useSignal";
import { useUser } from "../../../hooks/useUser";
import { IEventInstance } from "../../../shared/model/IEventInstance";
import { useFetchEventInstance } from "../hooks/useFetchEventInstance";
import { IEvent } from "../model/IEvent";

export const useEventCalendarMyTrainingsViewModel = () => {
  const [selectedEventInstance, setSelectedEventInstance] = useState<
    IEventInstance | undefined
  >(undefined);
  const auth = useAuth();
  const [user] = useUser();
  const [reloadSignal, triggerReloadSignal] = useSignal();
  const fetchEventInstance = useFetchEventInstance();

  const onEventInstanceUnselect = () => setSelectedEventInstance(undefined);

  const onEventSelected = async (event: IEvent) => {
    if (auth.isAdmin()) {
      const eventInstance = await fetchEventInstance(event);
      setSelectedEventInstance(eventInstance);
    }
  };

  return {
    onEventInstanceUnselect,
    onEventSelected,
    reloadSignal,
    selectedEventInstance,
    triggerReloadSignal,
    userId: user.id,
  };
};
