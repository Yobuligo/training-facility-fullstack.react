import styles from "./EventButtonContent.module.scss";
import { IEventButtonContentProps } from "./IEventButtonContentProps";

export const EventButtonContent: React.FC<IEventButtonContentProps> = (
  props
) => {
  return <div className={styles.eventButtonContent}>{props.children}</div>;
};
