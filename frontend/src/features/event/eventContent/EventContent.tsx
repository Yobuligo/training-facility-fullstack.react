import styles from "./EventContent.module.scss";
import { IEventContentProps } from "./IEventContentProps";

export const EventContent: React.FC<IEventContentProps> = (props) => {
  return (
    <div className={styles.eventContent}>
      <h4 className={styles.title}>{props.eventDefinition.title}</h4>
      {props.eventDefinition.description}
    </div>
  );
};
