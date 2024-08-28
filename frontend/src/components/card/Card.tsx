import { style } from "../../core/ui/style";
import styles from "./Card.module.scss";
import { ICardProps } from "./ICardProps";

export const Card: React.FC<ICardProps> = (props) => {
  return (
    <div
      className={style(props.className, styles.card)}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};
