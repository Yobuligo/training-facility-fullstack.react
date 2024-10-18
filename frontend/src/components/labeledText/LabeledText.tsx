import { ILabeledTextProps } from "./ILabeledTextProps";
import styles from "./LabeledText.module.scss";

export const LabeledText: React.FC<ILabeledTextProps> = (props) => {
  return (
    <div className={props.className}>
      <label className={styles.label}>{props.label}</label>
      <div className={styles.text}>{props.text}</div>
    </div>
  );
};
