import { Card } from "../../../components/card/Card";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { UserInfo } from "../../../services/UserInfo";
import { UserTrialTrainingRecordItem } from "../userTrialTrainingRecordItem/UserTrialTrainingRecordItem";
import { IUserTrialTrainingRecordsItemProps } from "./IUserTrialTrainingRecordsItemProps";
import styles from "./UserTrialTrainingRecordsItem.module.scss";

export const UserTrialTrainingRecordsItem: React.FC<
  IUserTrialTrainingRecordsItemProps
> = (props) => {
  const { t } = useTranslation();

  const userTrialTrainingRecords =
    props.userTrialTrainingRecords.userTrialTrainingRecords.map(
      (userTrialTrainingRecord) => (
        <UserTrialTrainingRecordItem
          key={userTrialTrainingRecord.id}
          userTrialTrainingRecord={userTrialTrainingRecord}
        />
      )
    );

  return (
    <Card className={styles.userTrialTrainingRecordsItem}>
      <div className={styles.name}>
        {UserInfo.toFullName(props.userTrialTrainingRecords)}
      </div>
      <div>
        {t(texts.user.email)}: {props.userTrialTrainingRecords.email}
      </div>
      {userTrialTrainingRecords}
    </Card>
  );
};
