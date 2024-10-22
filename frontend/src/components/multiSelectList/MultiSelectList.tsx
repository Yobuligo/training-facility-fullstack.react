import { MultiSelectItem } from "../multiSelectItem/MultiSelectItem";
import { IMultiSelectListProps } from "./IMultiSelectListProps";
import styles from "./MultiSelectList.module.scss";
import { useMultiSelectGroupViewModel } from "./useMultiSelectListViewModel";

export function MultiSelectGroup<T>(props: IMultiSelectListProps<T>) {
  const viewModel = useMultiSelectGroupViewModel(props);

  const items = viewModel.multiSelectGroupItems.map(
    (multiSelectGroupItem, index) => (
      <MultiSelectItem
        key={index}
        options={multiSelectGroupItem.selectOptions}
      />
    )
  );

  return <div className={styles.multiSelectList}>{items}</div>;
}
