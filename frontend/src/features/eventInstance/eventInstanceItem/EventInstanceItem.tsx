import { Banner } from "../../../components/banner/Banner";
import { Card } from "../../../components/card/Card";
import { DateTime } from "../../../core/services/date/DateTime";
import { useRenderWeekday } from "../../../hooks/useRenderWeekday";
import styles from "./EventInstanceItem.module.scss";
import { IEventInstanceItemProps } from "./IEventInstanceItemProps";

export const EventInstanceItem: React.FC<IEventInstanceItemProps> = (props) => {
  const renderWeekday = useRenderWeekday();

  return (
    <Card className={styles.eventInstanceItem}>
      <Banner color={props.eventInstanceShort.color} />
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.title}>{props.eventInstanceShort.title}</div>
          <div className={styles.timeContainer}>
            <div className={styles.weekday}>
              {renderWeekday(
                DateTime.toWeekday(props.eventInstanceShort.from),
                true
              )}
            </div>

            <div className={styles.dateTimeContainer}>
              <div>
                {DateTime.format(props.eventInstanceShort.from, "dd.MM.yyyy")}
              </div>
              <div>{`${DateTime.toTime(
                props.eventInstanceShort.from
              )} - ${DateTime.toTime(props.eventInstanceShort.to)}`}</div>
            </div>
          </div>
        </div>
        {props.children}
      </div>
    </Card>
  );
};
