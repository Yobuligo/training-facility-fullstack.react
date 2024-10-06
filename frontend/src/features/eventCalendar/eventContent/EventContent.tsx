import { style } from "../../../core/ui/style";
import styles from "./EventContent.module.scss";
import { IEventContentProps } from "./IEventContentProps";

/**
 * This component is responsible for rendering the content of an event like buttons or text, which is aligned at the bottom, right.
 */
export const EventContent: React.FC<IEventContentProps> = (props) => {
  return (
    <div className={style(styles.eventContent, props.className)}>
      {props.children}
    </div>
  );
};
