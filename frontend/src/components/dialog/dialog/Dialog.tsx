import styles from "./Dialog.module.scss";
import { IDialogProps } from "./IDialogProps";

export const Dialog: React.FC<IDialogProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.dialog}>
        <div className={styles.header}>{props.title}</div>
        <div className={styles.body}>{props.children}</div>
        {props.footer && <div>{props.footer}</div>}
      </div>
    </div>
  );
};
