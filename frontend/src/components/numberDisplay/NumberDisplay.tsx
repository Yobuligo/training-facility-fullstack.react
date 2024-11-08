import { style } from "../../core/ui/style";
import { INumberDisplayProps } from "./INumberDisplayProps";
import styles from "./NumberDisplay.module.scss";

export const NumberDisplay: React.FC<INumberDisplayProps> = (props) => {
  return (
    <div className={style(styles.numberDisplay, props.className)}>
      {props.value}
    </div>
  );
};
