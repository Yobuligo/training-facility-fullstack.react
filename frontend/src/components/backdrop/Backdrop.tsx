import styles from "./Backdrop.module.scss";
import { IBackdropProps } from "./IBackdropProps";

export const Backdrop: React.FC<IBackdropProps> = (props) => {
  return <div className={styles.backdrop}>{props.children}</div>;
};
