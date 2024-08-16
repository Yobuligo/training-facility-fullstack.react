import { useMemo } from "react";
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

  return { recurrenceOptions };
};
