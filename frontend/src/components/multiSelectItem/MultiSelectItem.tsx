import { AddIcon } from "../../icons/AddIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { SecondaryButton } from "../secondaryButton/SecondaryButton";
import { Select } from "../select/Select";
import { SpinnerButton } from "../spinnerButton/SpinnerButton";
import { IMultiSelectItemProps } from "./IMultiSelectItemProps";
import styles from "./MultiSelectItem.module.scss";

export function MultiSelectItem<T>(props: IMultiSelectItemProps<T>) {
  return (
    <div className={styles.multiSelectItem}>
      <Select className={styles.select} options={props.options} />
      <SpinnerButton displaySpinner={false} onClick={props.onAdd}>
        <AddIcon className={styles.icon} />
      </SpinnerButton>
      <SecondaryButton displaySpinner={false} onClick={props.onDelete}>
        <DeleteIcon />
      </SecondaryButton>
    </div>
  );
}
