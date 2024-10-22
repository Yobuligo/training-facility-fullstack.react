import { List } from "../../core/services/list/List";
import { AddIcon } from "../../icons/AddIcon";
import { MultiSelectItem } from "../multiSelectItem/MultiSelectItem";
import { SpinnerButton } from "../spinnerButton/SpinnerButton";
import { IMultiSelectListProps } from "./IMultiSelectListProps";
import styles from "./MultiSelectList.module.scss";
import { useMultiSelectListViewModel } from "./useMultiSelectListViewModel";

export function MultiSelectGroup<T>(props: IMultiSelectListProps<T>) {
  const viewModel = useMultiSelectListViewModel(props);

  const items = viewModel.multiSelectItems.map((multiSelectItem, index) => (
    <MultiSelectItem
      key={index}
      multiSelectItem={multiSelectItem}
      onAdd={viewModel.onAdd}
      onDelete={viewModel.onDelete}
      onSelect={viewModel.onSelect}
      selected={multiSelectItem.selected}
    />
  ));

  return (
    <div className={styles.multiSelectList}>
      {List.isEmpty(items) ? (
        <div className={styles.addButton}>
          <SpinnerButton displaySpinner={false} onClick={viewModel.onAdd}>
            <AddIcon className={styles.addIcon} />
          </SpinnerButton>
        </div>
      ) : (
        items
      )}
    </div>
  );
}
