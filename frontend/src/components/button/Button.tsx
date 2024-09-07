import { style } from "../../core/ui/style";
import styles from "./Button.module.scss";
import { IButtonProps } from "./IButtonProps";

export const Button: React.FC<IButtonProps> = (props) => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (props.disabled !== true) {
      props.onClick?.(event);
    }
  };
  return (
    <button
      className={style(
        styles.button,
        props.disabled === true ? styles.buttonDisabled : styles.buttonEnabled,
        props.className
      )}
      disabled={props.disabled}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
};
