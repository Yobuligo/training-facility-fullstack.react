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
   * Returns the first free option, which is not in use, so not selected.
   */
  const findFirstFreeOption = (
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

    // Update multiSelectItems.options so that already selected elements can not be selected multiple times.
    // Consider to add the select option, if the selected element of a multiSelectItem is the selected.
    // E.g. if we have the keys 1, 2, 3 and in one select option, the key 2 is selected, then we have to add the select option with key 2.
    multiSelectItems.forEach((multiSelectItem) => {
      for (let i = 0; i < multiSelectItem.options.length; i++) {
        const option = multiSelectItem.options[i];

        // delete if key is already in use
        if (
          option.key !== multiSelectItem.selected.key &&
          selectedKeys.has(option.key)
        ) {
          multiSelectItem.options.splice(i, 1);
          i--;
        }
      }
    });
  };

  const onAdd = () => {
    const toBeSelected = findFirstFreeOption(multiSelectItems);
    if (!toBeSelected) {
      return;
    }

    setMultiSelectItems((previous) => {
      previous.push({
        id: uuid(),
        options: props.options,
        selected: toBeSelected,
      });
      return [...previous];
    });
  };

  const onDelete = (multiSelectItem: IMultiSelectItem<T>) =>
    setMultiSelectItems((previous) => {
      const index = previous.findIndex(
        (item) => item.id === multiSelectItem.id
      );
      if (index !== -1) {
        previous.splice(index, 1);
      }
      return [...previous];
    });

  const onSelect = (
    multiSelectItem: IMultiSelectItem<T>,
    option: ISelectOption<T>
  ) => {
    setMultiSelectItems((previous) => {
      const index = previous.findIndex(
        (item) => item.id === multiSelectItem.id
      );
      if (index !== -1) {
        multiSelectItem.selected = option;
        previous.splice(index, 1, multiSelectItem);
      }
      return [...previous];
    });
  };

  return { multiSelectItems, onAdd, onDelete, onSelect };
};
