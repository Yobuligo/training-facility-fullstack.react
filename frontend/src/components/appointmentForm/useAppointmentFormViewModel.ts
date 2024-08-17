import { useMemo } from "react";
import { DateTime } from "../../core/services/date/DateTime";
import { useRenderRecurrence } from "../../hooks/useRenderRecurrence";
import { Recurrence } from "../../shared/types/Recurrence";
import { ISelectOption } from "../select/ISelectOption";
import { IAppointmentFormProps } from "./IAppointmentFormProps";

export const useAppointmentFormViewModel = (props: IAppointmentFormProps) => {
  const render = useRenderRecurrence();

  const recurrenceOptions: ISelectOption<Recurrence>[] = useMemo(
    () => [
      { key: Recurrence.ONCE, text: render(Recurrence.ONCE) },
      { key: Recurrence.DAILY, text: render(Recurrence.DAILY) },
      { key: Recurrence.WEEKLY, text: render(Recurrence.WEEKLY) },
      { key: Recurrence.MONTHLY, text: render(Recurrence.MONTHLY) },
    ],
    [render]
  );

  const selectedRecurrence = recurrenceOptions.find(
    (selectOption) => selectOption.key === props.recurrence
  );

  const onChangeFromDate = (newDate: string) => {
    const from = DateTime.create(newDate, DateTime.toTime(props.from));
    props.setFrom(from);
  };

  const onChangeFromTime = (newTime: string) => {
    const from = DateTime.create(DateTime.toDate(props.from), newTime);
    props.setFrom(from);
  };

  const onChangeRecurrence = (selectedRecurrence: ISelectOption<Recurrence>) =>
    props.setRecurrence(selectedRecurrence.key);

  const onChangeToDate = (newDate: string) => {
    const to = DateTime.create(newDate, DateTime.toTime(props.to));
    props.setTo(to);
  };

  const onChangeToTime = (newTime: string) => {
    const to = DateTime.create(DateTime.toDate(props.to), newTime);
    props.setFrom(to);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  return {
    onChangeFromDate,
    onChangeFromTime,
    onChangeRecurrence,
    onChangeToDate,
    onChangeToTime,
    onSubmit,
    recurrenceOptions,
    selectedRecurrence,
  };
};
