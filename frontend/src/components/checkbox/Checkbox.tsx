import styles from "./Checkbox.module.scss";
import { ICheckboxProps } from "./ICheckboxProps";

export const Checkbox: React.FC<ICheckboxProps> = (props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    props.onChange?.(event.target.checked);

  return (
    <label className={styles.checkbox}>
      <input type="checkbox" checked={props.isChecked} onChange={onChange} />
      <span className={styles.checkmark}></span>
      {props.text}
    </label>
  );
};
