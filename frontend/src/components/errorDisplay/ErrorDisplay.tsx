import { IErrorDisplayProps } from "./IErrorDisplayProps";
import styles from "./ErrorDisplay.module.scss";

export const ErrorDisplay: React.FC<IErrorDisplayProps> = (props) => {
  return <div className={styles.errorDisplay}>{props.error}</div>;
};
