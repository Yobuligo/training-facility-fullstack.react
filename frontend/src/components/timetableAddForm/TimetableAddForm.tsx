import { LabeledInput } from "../labeledInput/LabeledInput";
import { LabeledSelect } from "../labeledSelect/LabeledSelect";
import { ITimetableAddFormProps } from "./ITimetableAddFormProps";
import styles from "./TimetableAddForm.module.scss";

export const TimetableAddForm: React.FC<ITimetableAddFormProps> = (props) => {
  return (
    <div className={styles.timetableAddForm}>
      <LabeledInput label="title" />
      <LabeledInput label="start date" type="date" />
      <LabeledInput label="start time" type="time" />
      <LabeledInput label="end date" type="date" />
      <LabeledInput label="end time" type="time" />
      <LabeledSelect label="Recurrence" options={[]} />
    </div>
  );
};
