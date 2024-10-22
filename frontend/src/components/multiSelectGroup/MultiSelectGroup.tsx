import { AddIcon } from "../../icons/AddIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { SecondaryButton } from "../secondaryButton/SecondaryButton";
import { Select } from "../select/Select";
import { SpinnerButton } from "../spinnerButton/SpinnerButton";
import { IMultiSelectGroupProps } from "./IMultiSelectGroupProps";
import styles from "./MultiSelectGroup.module.scss";
import { useMultiSelectGroupViewModel } from "./useMultiSelectGroupViewModel";

export function MultiSelectGroup<T>(props: IMultiSelectGroupProps<T>) {
  const viewModel = useMultiSelectGroupViewModel(props);

  const items = viewModel.multiSelectGroupItems.map(
    (multiSelectGroupItem, index) => (
      <div key={index} className={styles.multiSelectGroupItem}>
        <Select
          className={styles.select}
          options={multiSelectGroupItem.selectOptions}
        />
        <SpinnerButton displaySpinner={false}>
          <AddIcon className={styles.icon} />
        </SpinnerButton>
        <SecondaryButton displaySpinner={false}>
          <DeleteIcon />
        </SecondaryButton>
      </div>
    )
  );

  return <div className={styles.multiSelectGroup}>{items}</div>;
}
