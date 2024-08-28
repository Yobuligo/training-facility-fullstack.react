import { useRenderWeekday } from "../../hooks/useRenderWeekday";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { LabeledInput } from "../labeledInput/LabeledInput";
import { LabeledSelect } from "../labeledSelect/LabeledSelect";
import styles from "./AppointmentForm.module.scss";
import { IAppointmentFormProps } from "./IAppointmentFormProps";
import { useAppointmentFormViewModel } from "./useAppointmentFormViewModel";

export const AppointmentForm: React.FC<IAppointmentFormProps> = (props) => {
  const renderWeekday = useRenderWeekday();
  const { t } = useTranslation();
  const viewModel = useAppointmentFormViewModel(props);

  return (
    <form className={styles.appointmentForm} onSubmit={viewModel.onSubmit}>
      <div>
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.AppointmentForm.title)}
          onChange={props.setTitle}
          value={props.title}
        />
      </div>
      <div>
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.AppointmentForm.description)}
          onChange={props.setDescription}
          value={props.description}
        />
      </div>
      <div className={styles.dateTime}>
        <div className={styles.date}>
          <LabeledInput
            disabled={props.disabled}
            label={t(texts.AppointmentForm.startDate)}
            onChange={viewModel.onChangeFromDate}
            type="date"
            value={props.fromDate}
          />
          <div className={styles.weekday}>
            {renderWeekday(viewModel.getFromWeekendDay())}
          </div>
        </div>
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.AppointmentForm.startTime)}
          onChange={viewModel.onChangeFromTime}
          type="time"
          value={props.fromTime}
        />
      </div>
      <div className={styles.dateTime}>
        <div className={styles.date}>
          <LabeledInput
            disabled={props.disabled}
            label={t(texts.AppointmentForm.endDate)}
            onChange={viewModel.onChangeToDate}
            type="date"
            value={props.toDate}
          />
          <div className={styles.weekday}>
            {renderWeekday(viewModel.getToWeekendDay())}
          </div>
        </div>
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.AppointmentForm.endTime)}
          onChange={viewModel.onChangeToTime}
          type="time"
          value={props.toTime}
        />
      </div>
      <div>
        <LabeledSelect
          disabled={props.disabled}
          label={t(texts.AppointmentForm.recurrence)}
          options={viewModel.recurrenceOptions}
          selected={viewModel.selectedRecurrence}
          onSelect={viewModel.onChangeRecurrence}
        />
      </div>
    </form>
  );
};
