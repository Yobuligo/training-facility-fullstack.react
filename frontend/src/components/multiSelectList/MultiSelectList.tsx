import { List } from "../../core/services/list/List";
import { style } from "../../core/ui/style";
import { AddIcon } from "../../icons/AddIcon";
import { MultiSelectItem } from "../multiSelectItem/MultiSelectItem";
import { SpinnerButton } from "../spinnerButton/SpinnerButton";
import { IMultiSelectListProps } from "./IMultiSelectListProps";
import styles from "./MultiSelectList.module.scss";
import { useMultiSelectListViewModel } from "./useMultiSelectListViewModel";

export function MultiSelectList<T>(props: IMultiSelectListProps<T>) {
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
    <div className={style(styles.multiSelectList, props.className)}>
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
