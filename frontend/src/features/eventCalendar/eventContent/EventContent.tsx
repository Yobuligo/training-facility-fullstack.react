import { Banner } from "../../../components/banner/Banner";
import { style } from "../../../utils/style";
import styles from "./EventContent.module.scss";
import { IEventContentProps } from "./IEventContentProps";

export const EventContent: React.FC<IEventContentProps> = (props) => {
  return (
    <div className={styles.eventContent}>
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
