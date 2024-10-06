import { useDateTimeSpanFilter } from "../../../hooks/useDateTimeSpanFilter";
import { IEventDefinitionSectionProps } from "./IEventDefinitionSectionProps";

export const useEventDefinitionSectionViewModel = (
  props: IEventDefinitionSectionProps
) => {
  const [dateTimeSpanFilter, setDateTimeSpanFilter] = useDateTimeSpanFilter();
  const onReload = (from: Date, to: Date) => props.onReload?.({ from, to });

  const onDateTimeSpanChanged = (from: Date, to: Date) => {
    setDateTimeSpanFilter({ from, to });
    onReload(from, to);
  };

  const onRegister = () =>
    onReload(dateTimeSpanFilter.from, dateTimeSpanFilter.to);

  const onUnregister = () =>
    onReload(dateTimeSpanFilter.from, dateTimeSpanFilter.to);

  return {
    dateTimeSpanFilter,
    onDateTimeSpanChanged,
    onRegister,
    onUnregister,
  };
};
