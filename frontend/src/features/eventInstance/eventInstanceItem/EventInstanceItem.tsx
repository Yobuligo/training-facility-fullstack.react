import { Banner } from "../../../components/banner/Banner";
import { Card } from "../../../components/card/Card";
import { DateTime } from "../../../core/services/date/DateTime";
import { style } from "../../../core/ui/style";
import { useRenderWeekday } from "../../../hooks/useRenderWeekday";
import styles from "./EventInstanceItem.module.scss";
import { IEventInstanceItemProps } from "./IEventInstanceItemProps";

export const EventInstanceItem: React.FC<IEventInstanceItemProps> = (props) => {
  const renderWeekday = useRenderWeekday();

  const renderChildren = () => (
    <div className={style(styles.children, props.classNameChildren)}>
      {props.children}
    </div>
  );

  return (
    <Card className={styles.card}>
      <div className={styles.eventInstanceItem}>
        <div className={styles.header}>
          <Banner color={props.eventInstanceItemModel.color} />
          <div className={styles.content}>
            <div className={styles.title}>
              {props.eventInstanceItemModel.title}
            </div>
            <div className={styles.timeContainer}>
              <div className={styles.weekday}>
                {renderWeekday(
                  DateTime.toWeekday(props.eventInstanceItemModel.from),
                  true
                )}
              </div>

              <div className={styles.dateTimeContainer}>
                <div>
                  {DateTime.format(
                    props.eventInstanceItemModel.from,
                    "dd.MM.yyyy"
                  )}
                </div>
                <div>{`${DateTime.toTime(
                  props.eventInstanceItemModel.from
                )} - ${DateTime.toTime(props.eventInstanceItemModel.to)}`}</div>
              </div>
              {props.renderChildrenInline === true && props.children && (
                <div className={props.classNameChildren}>{props.children}</div>
              )}
            </div>
          </div>
        </div>
        {(props.renderChildrenInline === undefined ||
          props.renderChildrenInline === false) &&
          props.children && <>{renderChildren()}</>}
      </div>
    </Card>
  );
};
