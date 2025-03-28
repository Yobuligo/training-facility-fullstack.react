import { DateTimeFormatter } from "../../../core/services/date/DateTimeFormatter";
import { IUserTrialTrainingRecordItemProps } from "./IUserTrialTrainingRecordItemProps";
import styles from "./UserTrialTrainingRecordItem.module.scss";

export const UserTrialTrainingRecordItem: React.FC<
  IUserTrialTrainingRecordItemProps
> = (props) => {
  const date = DateTimeFormatter.format(
    props.userTrialTrainingRecord.from,
    "yyyy-MM-dd"
  );
  const from = DateTimeFormatter.format(
    props.userTrialTrainingRecord.from,
    "hh:mm"
  );

  const to = DateTimeFormatter.format(
    props.userTrialTrainingRecord.to,
    "hh:mm"
  );

  return (
    <div className={styles.userTrialTrainingRecordItem}>
      <div className={styles.date}>
        <div>{date}</div>
        <div> {`${from} - ${to}`}</div>
      </div>
    </div>
  );
};
