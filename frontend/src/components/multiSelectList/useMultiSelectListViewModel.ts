import { useState } from "react";
import { uuid } from "../../utils/uuid";
import { ISelectOption } from "../select/ISelectOption";
import { IMultiSelectItem } from "./IMultiSelectItem";
import { IMultiSelectListProps } from "./IMultiSelectListProps";

export const useMultiSelectListViewModel = <T>(
  props: IMultiSelectListProps<T>
) => {
  const [multiSelectItems, setMultiSelectItems] = useState<
    IMultiSelectItem<T>[]
  >([{ id: uuid(), options: props.options, selected: props.options[0] }]);

  /**
   * Returns the keys of the select options, which are in use, which means which are selected.
   */
  const findSelectedKeys = (
    multiSelectItems: IMultiSelectItem<T>[]
  ): Set<T> => {
    const selectedKeys = new Set<T>();
    for (const multiSelectItem of multiSelectItems) {
      selectedKeys.add(multiSelectItem.selected.key);
    }
    return selectedKeys;
  };

  /**
   * Returns the next free option, which is not in use, so not selected, otherwise undefined.
   */
  const findNextFreeOption = (
    multiSelectItems: IMultiSelectItem<T>[]
  ): ISelectOption<T> | undefined => {
    const selectedKeys = findSelectedKeys(multiSelectItems);
    for (const option of props.options) {
      if (!selectedKeys.has(option.key)) {
        return option;
      }
    }
    return undefined;
  };

  /**
   * Updates the options of each multiSelectItem. If an option is selected, is must not be available for another selection.
   */
  const updateOptions = (multiSelectItems: IMultiSelectItem<T>[]) => {
    const selectedKeys = findSelectedKeys(multiSelectItems);

    // Filter free options (which are not in use, so currently free, which can be selected) or an option in case it is the selected option of the multiSelectItem
    multiSelectItems.forEach((multiSelectItem) => {
      multiSelectItem.options = props.options.filter(
        (option) =>
          option.key === multiSelectItem.selected.key ||
          !selectedKeys.has(option.key)
      );
    });
  };

  const onAdd = () => {
    // find the next free option
    const toBeSelected = findNextFreeOption(multiSelectItems);
    if (!toBeSelected) {
      return;
    }

    setMultiSelectItems((previous) => {
      // add new entry with the next free option
      previous.push({
        id: uuid(),
        options: props.options,
        selected: toBeSelected,
      });

      updateOptions(previous);
      return [...previous];
    });
  };

  const onDelete = (multiSelectItem: IMultiSelectItem<T>) =>
    setMultiSelectItems((previous) => {
      // delete multiSelectItem from the list
      const index = previous.findIndex(
        (item) => item.id === multiSelectItem.id
      );
      if (index !== -1) {
        previous.splice(index, 1);
      }

      updateOptions(previous);
      return [...previous];
    });

  const onSelect = (
    multiSelectItem: IMultiSelectItem<T>,
    option: ISelectOption<T>
  ) => {
    setMultiSelectItems((previous) => {
      // update the selected option of a multiSelectOption
      const index = previous.findIndex(
        (item) => item.id === multiSelectItem.id
      );
      if (index !== -1) {
        multiSelectItem.selected = option;
        previous.splice(index, 1, multiSelectItem);
      }

      updateOptions(previous);
      return [...previous];
    });
  };

  return { multiSelectItems, onAdd, onDelete, onSelect };
};
