import { Banner } from "../../../components/banner/Banner";
import { style } from "../../../core/ui/style";
import styles from "./EventCalendarContent.module.scss";
import { IEventCalendarContentProps } from "./IEventCalendarContentProps";

/**
 * This component is responsible for rendering one calendar event with title and the given content.
 */
export const EventCalendarContent: React.FC<IEventCalendarContentProps> = (
  props
) => {
  return (
    <div className={styles.eventCalendarContent}>
      <Banner className={styles.banner} color={props.eventDefinition.color} />
      <div className={style(styles.content, props.className)}>
        <div className={styles.header}>
          <h4 className={styles.title}>{props.eventDefinition.title}</h4>
          <span className={styles.description}>
            {props.eventDefinition.description}
          </span>
        </div>
        {props.children}
      </div>
    </div>
  );
};
