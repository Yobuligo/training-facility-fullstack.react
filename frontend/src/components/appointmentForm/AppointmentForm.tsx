import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { LabeledInput } from "../labeledInput/LabeledInput";
import { LabeledSelect } from "../labeledSelect/LabeledSelect";
import styles from "./AppointmentForm.module.scss";
import { IAppointmentFormProps } from "./IAppointmentFormProps";
import { useAppointmentFormViewModel } from "./useAppointmentFormViewModel";

export const AppointmentForm: React.FC<IAppointmentFormProps> = (props) => {
  const { t } = useTranslation();
  const viewModel = useAppointmentFormViewModel(props);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    event.preventDefault();

  return (
    <form className={styles.appointmentForm} onSubmit={onSubmit}>
      <div>
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.AppointmentForm.title)}
        />
      </div>
      <div>
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.AppointmentForm.description)}
        />
      </div>
      <div className={styles.dateTime}>
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.AppointmentForm.startDate)}
          type="date"
        />
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.AppointmentForm.startTime)}
          type="time"
        />
      </div>
      <div className={styles.dateTime}>
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.AppointmentForm.endDate)}
          type="date"
        />
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.AppointmentForm.endTime)}
          type="time"
        />
      </div>
      <div>
        <LabeledSelect
          disabled={props.disabled}
          label={t(texts.AppointmentForm.recurrence)}
          options={viewModel.recurrenceOptions}
        />
      </div>
    </form>
  );
};
