import styles from "./Checkbox.module.scss";
import { ICheckboxProps } from "./ICheckboxProps";

export const Checkbox: React.FC<ICheckboxProps> = (props) => {
  return (
    <input
      className={styles.checkbox}
      checked
      onChange={(event) => {
        console.log(event.target.value);
      }}
      type="checkbox"
    />
  );
};
