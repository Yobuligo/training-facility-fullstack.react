import { AddIcon } from "../../icons/AddIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { SecondaryButton } from "../secondaryButton/SecondaryButton";
import { ISelectOption } from "../select/ISelectOption";
import { Select } from "../select/Select";
import { SpinnerButton } from "../spinnerButton/SpinnerButton";
import { IMultiSelectItemProps } from "./IMultiSelectItemProps";
import styles from "./MultiSelectItem.module.scss";

export function MultiSelectItem<T>(props: IMultiSelectItemProps<T>) {
  const onAdd = () => props.onAdd?.();

  const onDelete = () => props.onDelete?.(props.multiSelectItem);

  const onSelect = (option: ISelectOption<T>) =>
    props.onSelect?.(props.multiSelectItem, option);

  return (
    <div className={styles.multiSelectItem}>
      <Select
        className={styles.select}
        options={props.multiSelectItem.options}
        onSelect={onSelect}
        selected={props.selected}
      />
      <SpinnerButton displaySpinner={false} onClick={onAdd}>
        <AddIcon className={styles.icon} />
      </SpinnerButton>
      <SecondaryButton displaySpinner={false} onClick={onDelete}>
        <DeleteIcon />
      </SecondaryButton>
    </div>
  );
}
