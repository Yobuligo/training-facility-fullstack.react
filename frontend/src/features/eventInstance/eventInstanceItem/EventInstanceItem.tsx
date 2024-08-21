import { Card } from "../../../components/card/Card";
import { DateTime } from "../../../core/services/date/DateTime";
import styles from "./EventInstanceItem.module.scss";
import { IEventInstanceItemProps } from "./IEventInstanceItemProps";

export const EventInstanceItem: React.FC<IEventInstanceItemProps> = (props) => {
  return (
    <Card className={styles.eventInstanceItem}>
      <div
        className={styles.banner}
        style={{
          backgroundColor: `${props.eventInstance.eventDefinition.color}`,
        }}
      />
      <div className={styles.content}>
        <div className={styles.title}>{props.eventInstance.title}</div>
        <div>{DateTime.format(props.eventInstance.from, "dd.MM.yyyy")}</div>
        <div>{`${DateTime.toTime(props.eventInstance.from)} - ${DateTime.toTime(
          props.eventInstance.to
        )}`}</div>
      </div>
    </Card>
  );
};
