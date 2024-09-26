import { useState } from "react";
import { IEvent } from "../model/IEvent";

export const useEventCalendarTrialTrainingViewModel = () => {
  const [selectedEvent, setSelectedEvent] = useState<IEvent | undefined>(
    undefined
  );

  const onBack = () => setSelectedEvent(undefined);

  const onBook = (event: IEvent) => setSelectedEvent(event);

  return { onBack, onBook, selectedEvent };
};
