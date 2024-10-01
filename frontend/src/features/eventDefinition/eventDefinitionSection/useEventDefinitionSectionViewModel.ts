import { useMemo, useState } from "react";
import { DateTime } from "../../../core/services/date/DateTime";
import { EventFactory } from "../../../services/EventFactory";
import { IEvent } from "../../eventCalendar/model/IEvent";
import { eventCreator } from "../eventDefinitionItem/eventCreator";
import { IEventDefinitionSectionProps } from "./IEventDefinitionSectionProps";

export const useEventDefinitionSectionViewModel = (
  props: IEventDefinitionSectionProps
) => {
  const [from, setFrom] = useState(DateTime.getWeekStartDate(new Date()));
  const [to, setTo] = useState(DateTime.getWeekEndDate(new Date()));

  const events: IEvent[] = useMemo(
    () =>
      EventFactory.createFromEventDefinitions(
        eventCreator,
        props.eventDefinitions,
        from,
        to
      ),
    [from, props.eventDefinitions, to]
  );

  return {
    events,
    from,
    to,
  };
};
