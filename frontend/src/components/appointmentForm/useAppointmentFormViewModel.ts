import { useMemo, useState } from "react";
import { DateTime } from "../../core/services/date/DateTime";
import { Recurrence } from "../../core/types/Recurrence";
import { useRenderRecurrence } from "../../hooks/useRenderRecurrence";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { ISelectOption } from "../select/ISelectOption";
import { IAppointmentFormProps } from "./IAppointmentFormProps";

export const useAppointmentFormViewModel = (props: IAppointmentFormProps) => {
  const debounceInterval = 500;
  const { t } = useTranslation();
  const render = useRenderRecurrence();
  const [fromTimeout, setFromTimeout] = useState<NodeJS.Timeout | undefined>(
    undefined
  );
  const [toTimeout, setToTimeout] = useState<NodeJS.Timeout | undefined>(
    undefined
  );

  const isMemberOnlyOptions: ISelectOption<boolean>[] = useMemo(
    () => [
      { key: false, text: t(texts.general.no) },
      { key: true, text: t(texts.general.yes) },
    ],
    [t]
  );

  const recurrenceOptions: ISelectOption<Recurrence>[] = useMemo(
    () => [
      { key: Recurrence.ONCE, text: render(Recurrence.ONCE) },
      { key: Recurrence.DAILY, text: render(Recurrence.DAILY) },
      { key: Recurrence.WEEKLY, text: render(Recurrence.WEEKLY) },
      { key: Recurrence.MONTHLY, text: render(Recurrence.MONTHLY) },
    ],
    [render]
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  /**
   * Checks if to is earlier than from, in that case correct to by adding one hour
   */
  const correctTo = (from: Date, to: Date) => {
    clearTimeout(toTimeout);
    const newToTimeout = setTimeout(() => {
      if (DateTime.compare(from, to) >= 0) {
        const newTo = DateTime.addHours(from, 1);
        props.setToDate(DateTime.toDate(newTo));
        props.setToTime(DateTime.toTime(newTo));
      }
    }, debounceInterval);
    setToTimeout(newToTimeout);
  };

  /**
   * Checks if to is earlier than from, in that case correct to by adding one hour
   */
  const correctFrom = (from: Date, to: Date) => {
    clearTimeout(fromTimeout);
    const newFromTimeout = setTimeout(() => {
      if (DateTime.compare(from, to) === 1) {
        const newFrom = DateTime.subtractHours(to, 1);
        props.setFromDate(DateTime.toDate(newFrom));
        props.setFromTime(DateTime.toTime(newFrom));
      }
    }, debounceInterval);
    setFromTimeout(newFromTimeout);
  };

  const onChangeFromDate = (fromDate: string) => {
    props.setFromDate(fromDate);
    const from = DateTime.create(fromDate, props.fromTime);
    const to = DateTime.create(props.toDate, props.toTime);
    correctTo(from, to);
  };

  const onChangeFromTime = (fromTime: string) => {
    props.setFromTime(fromTime);
    const from = DateTime.create(props.fromDate, fromTime);
    const to = DateTime.create(props.toDate, props.toTime);
    correctTo(from, to);
  };

  const onChangeToDate = (toDate: string) => {
    props.setToDate(toDate);
    const from = DateTime.create(props.fromDate, props.fromTime);
    const to = DateTime.create(toDate, props.toTime);
    correctFrom(from, to);
  };

  const onChangeToTime = (toTime: string) => {
    props.setToTime(toTime);
    const from = DateTime.create(props.fromDate, props.fromTime);
    const to = DateTime.create(props.toDate, toTime);
    correctFrom(from, to);
  };

  const getFromWeekendDay = () => {
    const from = DateTime.create(props.fromDate, props.fromTime);
    return DateTime.toWeekday(from);
  };

  const getToWeekendDay = () => {
    const to = DateTime.create(props.toDate, props.toTime);
    return DateTime.toWeekday(to);
  };

  return {
    getFromWeekendDay,
    getToWeekendDay,
    isMemberOnlyOptions,
    onChangeFromDate,
    onChangeFromTime,
    onChangeToDate,
    onChangeToTime,
    onSubmit,
    recurrenceOptions,
  };
};
