import { Card } from "../../components/card/Card";
import styles from "./Error.module.scss";
import { IErrorProps } from "./IErrorProps";

export const Error: React.FC<IErrorProps> = (props) => {
  return <Card className={styles.error}>{props.message}</Card>;
};
