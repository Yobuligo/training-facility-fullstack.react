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

  return (
    <form className={styles.appointmentForm} onSubmit={viewModel.onSubmit}>
      <div>
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.AppointmentForm.title)}
          onChange={viewModel.title.onChange}
          value={viewModel.title.value}
        />
      </div>
      <div>
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.AppointmentForm.description)}
          onChange={viewModel.description.onChange}
          value={viewModel.description.value}
        />
      </div>
      <div className={styles.dateTime}>
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.AppointmentForm.startDate)}
          onChange={viewModel.fromDate.onChange}
          type="date"
          value={viewModel.fromDate.value}
        />
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.AppointmentForm.startTime)}
          onChange={viewModel.fromTime.onChange}
          type="time"
          value={viewModel.fromTime.value}
        />
      </div>
      <div className={styles.dateTime}>
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.AppointmentForm.endDate)}
          onChange={viewModel.toDate.onChange}
          type="date"
          value={viewModel.toDate.value}
        />
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.AppointmentForm.endTime)}
          onChange={viewModel.toTime.onChange}
          type="time"
          value={viewModel.toTime.value}
        />
      </div>
      <div>
        <LabeledSelect
          disabled={props.disabled}
          label={t(texts.AppointmentForm.recurrence)}
          options={viewModel.recurrenceOptions}
          selected={viewModel.selectedRecurrence}
        />
      </div>
    </form>
  );
};
