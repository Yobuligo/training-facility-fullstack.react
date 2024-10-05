import { Banner } from "../../../components/banner/Banner";
import { Card } from "../../../components/card/Card";
import { DateTime } from "../../../core/services/date/DateTime";
import { style } from "../../../core/ui/style";
import { useRenderDate } from "../../../hooks/useRenderDate";
import { useRenderTimeSpan } from "../../../hooks/useRenderTimeSpan";
import { useRenderWeekday } from "../../../hooks/useRenderWeekday";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { MemberOnlyIcon } from "../../../icons/MemberOnlyIcon";
import { Boolean } from "../../../shared/types/Boolean";
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
    <Card className={styles.card} onClick={props.onClick}>
      <div className={styles.eventInstanceItem}>
        <div className={styles.header}>
          <Banner color={props.eventInstanceItemModel.color} />
          <div className={styles.content}>
            <div className={styles.titleContainer}>
              <div className={styles.title}>
                {props.eventInstanceItemModel.title}
              </div>
              {props.isMemberOnly === Boolean.true && screenSize.isSmall() ? (
                <MemberOnlyIcon />
              ) : (
                <></>
              )}
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
              {props.renderChildrenInline === true && props.children && (
                <div className={props.classNameChildren}>{props.children}</div>
              )}
            </div>
          </div>
          {props.isMemberOnly === Boolean.true && !screenSize.isSmall() ? (
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
