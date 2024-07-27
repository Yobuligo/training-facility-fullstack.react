import { style } from "../../utils/style";
import { Card } from "../card/Card";
import styles from "./Button.module.scss";
import { IButtonProps } from "./IButtonProps";

export const Button: React.FC<IButtonProps> = (props) => {
  const onClick = () => {
    if (props.disabled !== true) {
      props.onClick?.();
    }
  };

  return (
    <Card
      className={style(
        styles.buttonCard,
        props.disabled === true ? styles.buttonDisabled : styles.buttonEnabled,
        props.className
      )}
    >
      <button
        className={styles.button}
        disabled={props.disabled}
        onClick={onClick}
      >
        {props.children}
      </button>
    </Card>
  );
};
