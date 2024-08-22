import { Card } from "../../../components/card/Card";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import styles from "./EventRegistrationItem.module.scss";
import { IEventRegistrationItemProps } from "./IEventRegistrationItemProps";

export const EventRegistrationItem: React.FC<IEventRegistrationItemProps> = (
  props
) => {
  const userProfile = checkNotNull(props.eventRegistration.userProfile);

  return (
    <Card className={styles.eventRegistrationItem}>
      <div className="styles.name">
        {`${userProfile.firstname} ${userProfile.lastname}`}
      </div>
    </Card>
  );
};
