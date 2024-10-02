import { useState } from "react";
import { DateTime } from "../../../core/services/date/DateTime";
import { IEventDefinitionSectionProps } from "./IEventDefinitionSectionProps";

export const useEventDefinitionSectionViewModel = (
  props: IEventDefinitionSectionProps
) => {
  const [from, setFrom] = useState(DateTime.getWeekStartDate(new Date()));
  const [to, setTo] = useState(DateTime.getWeekEndDate(new Date()));

  const onReload = (from: Date, to: Date) => props.onReload?.({ from, to });

  const onDateTimeSpanChanged = (from: Date, to: Date) => {
    setFrom(from);
    setTo(to);
    onReload(from, to);
  };

  const onRegister = () => onReload(from, to);

  const onUnregister = () => onReload(from, to);

  return {
    from,
    onDateTimeSpanChanged,
    onRegister,
    onUnregister,
    to,
  };
};
