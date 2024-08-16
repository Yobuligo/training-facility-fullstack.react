import { texts } from "../../hooks/useTranslation/texts";
import { useTranslation } from "../../hooks/useTranslation/useTranslation";
import { LabeledInput } from "../labeledInput/LabeledInput";
import { LabeledSelect } from "../labeledSelect/LabeledSelect";
import { ITimetableAddFormProps } from "./ITimetableAddFormProps";
import styles from "./TimetableAddForm.module.scss";
import { useTimeTableAddFormViewModel } from "./useTimeTableAddFormViewModel";

export const TimetableAddForm: React.FC<ITimetableAddFormProps> = (props) => {
  const { t } = useTranslation();
  const viewModel = useTimeTableAddFormViewModel(props);

  return (
    <div className={styles.timetableAddForm}>
      <LabeledInput label={t(texts.timetableAddForm.title)} />
      <LabeledInput label={t(texts.timetableAddForm.startDate)} type="date" />
      <LabeledInput label={t(texts.timetableAddForm.startTime)} type="time" />
      <LabeledInput label={t(texts.timetableAddForm.endDate)} type="date" />
      <LabeledInput label={t(texts.timetableAddForm.endTime)} type="time" />
      <LabeledSelect
        label={t(texts.timetableAddForm.recurrence)}
        options={[]}
      />
    </div>
  );
};
