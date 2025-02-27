import { Banner } from "../../../components/banner/Banner";
import { Card } from "../../../components/card/Card";
import { DateTime } from "../../../core/services/date/DateTime";
import { style } from "../../../core/ui/style";
import { useRenderDate } from "../../../hooks/useRenderDate";
import { useRenderTimeSpan } from "../../../hooks/useRenderTimeSpan";
import { useRenderWeekday } from "../../../hooks/useRenderWeekday";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { MemberOnlyIcon } from "../../../icons/MemberOnlyIcon";
import { EventCalledOff } from "../../eventCalendar/eventCalledOff/EventCalledOff";
import styles from "./EventInstanceItem.module.scss";
import { IEventInstanceItemProps } from "./IEventInstanceItemProps";

export const EventInstanceItem: React.FC<IEventInstanceItemProps> = (props) => {
  const renderWeekday = useRenderWeekday();
  const renderDate = useRenderDate();
  const renderTimeSpan = useRenderTimeSpan();
  const screenSize = useScreenSize();

  const renderChildren = () => (
    <div className={style(styles.children, props.classNameChildren)}>
      {props.children}
    </div>
  );

  return (
    <Card
      className={style(
        styles.card,
        props.eventInstanceItemModel.calledOff ? styles.cardCalledOff : "",
        props.displayCursor ? styles.displayCursor : ""
      )}
      onClick={props.onClick}
    >
      <div className={styles.eventInstanceItem}>
        <div className={styles.header}>
          <Banner color={props.eventInstanceItemModel.color} />
          <div className={styles.content}>
            <div>
              <div className={styles.titleContainer}>
                <div className={styles.title}>
                  {props.eventInstanceItemModel.title}
                </div>
                {props.eventInstanceItemModel.isMemberOnly === true &&
                screenSize.isSmall() ? (
                  <MemberOnlyIcon />
                ) : (
                  <></>
                )}
              </div>
              <div className={styles.description}>
                {props.eventInstanceItemModel.description}
              </div>
            </div>
            <div className={styles.timeContainer}>
              <div className={styles.weekday}>
                {renderWeekday(
                  DateTime.toWeekday(props.eventInstanceItemModel.from),
                  true
                )}
              </div>

              <div className={styles.dateTimeContainer}>
                <div>{renderDate(props.eventInstanceItemModel.from)}</div>
                <div>
                  {renderTimeSpan({
                    from: props.eventInstanceItemModel.from,
                    to: props.eventInstanceItemModel.to,
                  })}
                </div>
              </div>
              {props.eventInstanceItemModel.calledOff ? (
                <div className={styles.calledOffText}>
                  <EventCalledOff />
                </div>
              ) : (
                <>
                  {props.renderChildrenInline === true && props.children && (
                    <div className={props.classNameChildren}>
                      {props.children}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          {props.eventInstanceItemModel.isMemberOnly === true &&
          !screenSize.isSmall() ? (
            <div className={styles.icon}>
              <MemberOnlyIcon />
            </div>
          ) : (
            <></>
          )}
        </div>
        {(props.renderChildrenInline === undefined ||
          props.renderChildrenInline === false) &&
          props.children && <>{renderChildren()}</>}
      </div>
    </Card>
  );
};
