import { useCallback, useEffect, useMemo } from "react";
import { DateTime } from "../../core/services/date/DateTime";
import { useRenderRecurrence } from "../../hooks/useRenderRecurrence";
import { useValue } from "../../hooks/useValue";
import { Recurrence } from "../../shared/types/Recurrence";
import { uuid } from "../../utils/uuid";
import { ISelectOption } from "../select/ISelectOption";
import { IAppointmentFormProps } from "./IAppointmentFormProps";

export const useAppointmentFormViewModel = (props: IAppointmentFormProps) => {
  const render = useRenderRecurrence();
  const title = useValue(props.appointment?.title ?? "");
  const description = useValue(props.appointment?.description ?? "");
  const fromDate = useValue(
    props.appointment?.from ? DateTime.toDate(props.appointment.from) : ""
  );
  const fromTime = useValue(
    props.appointment?.from ? DateTime.toTime(props.appointment.from) : ""
  );
  const toDate = useValue(
    props.appointment?.to ? DateTime.toDate(props.appointment.to) : ""
  );
  const toTime = useValue(
    props.appointment?.from ? DateTime.toTime(props.appointment.from) : ""
  );
  const recurrence = useValue(props.appointment?.recurrence ?? Recurrence.ONCE);

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
    (selectOption) => selectOption.key === recurrence.value
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  const onChange = useCallback(() => {
    if (!fromDate || !fromTime || !toDate || !toTime) {
      return;
    }

    if (props.onChange) {
      const from = DateTime.create(fromDate.value, fromTime.value);
      const to = DateTime.create(toDate.value, toTime.value);
      props.onChange({
        description: description.value,
        from,
        id: uuid(),
        recurrence: recurrence.value,
        title: title.value,
        to,
      });
    }
  }, [
    description.value,
    fromDate,
    fromTime,
    props,
    recurrence.value,
    title.value,
    toDate,
    toTime,
  ]);

  useEffect(() => {
    onChange();
  }, [
    onChange,
    title.value,
    fromDate.value,
    fromTime.value,
    toDate.value,
    toTime.value,
    recurrence.value,
  ]);

  return {
    description,
    fromDate,
    fromTime,
    onSubmit,
    recurrenceOptions,
    selectedRecurrence,
    title,
    toDate,
    toTime,
  };
};
