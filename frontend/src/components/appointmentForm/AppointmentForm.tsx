import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
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
      <LabeledInput
        disabled={props.disabled}
        error={props.titleError}
        isOptional={props.titleIsOptional}
        label={t(texts.appointmentForm.title)}
        maxLength={100}
        onChange={props.setTitle}
        value={props.title}
      />

      <LabeledInput
        disabled={props.disabled}
        error={props.descriptionError}
        isOptional={props.descriptionIsOptional}
        label={t(texts.appointmentForm.description)}
        maxLength={100}
        onChange={props.setDescription}
        value={props.description}
      />

      <div className={styles.dateTime}>
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.appointmentForm.startDate)}
          onChange={viewModel.onChangeFromDate}
          type="date"
          value={props.fromDate}
        />
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.appointmentForm.startTime)}
          onChange={viewModel.onChangeFromTime}
          type="time"
          value={props.fromTime}
        />
      </div>

      <div className={styles.dateTime}>
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.appointmentForm.endDate)}
          onChange={viewModel.onChangeToDate}
          type="date"
          value={props.toDate}
        />
        <LabeledInput
          disabled={props.disabled}
          label={t(texts.appointmentForm.endTime)}
          onChange={viewModel.onChangeToTime}
          type="time"
          value={props.toTime}
        />
      </div>

      <LabeledSelect
        disabled={props.disabled}
        label={t(texts.appointmentForm.recurrence)}
        options={viewModel.recurrenceOptions}
        selected={viewModel.selectedRecurrence}
        onSelect={viewModel.onChangeRecurrence}
      />

      {/* <LabeledSelect
        disabled={props.disabled}
        label={t(texts.appointmentForm.membersOnly)}
        options={viewModel.isMemberOnlyOptions}
        onSelect={viewModel.onIsMembersOnlyChange}
        selected={viewModel.selectedIsMembersOnly}
      /> */}
    </form>
  );
};
