import { Card } from "../../../components/card/Card";
import styles from "./EventRegistrationItem.module.scss";
import { IEventRegistrationItemProps } from "./IEventRegistrationItemProps";

export const EventRegistrationItem: React.FC<IEventRegistrationItemProps> = (
  props
) => {
  return (
    <Card className={styles.eventRegistrationItem}>
      {props.eventRegistration.userId}
    </Card>
  );
};
