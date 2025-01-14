import { useEffect, useState } from "react";
import { error } from "../../../core/utils/error";
import { isNotInitial } from "../../../core/utils/isNotInitial";
import { uuid } from "../../../utils/uuid";
import { ISelectOption } from "../../select/ISelectOption";
import { IMultiSelectItem } from "./IMultiSelectItem";
import { IMultiSelectListProps } from "./IMultiSelectListProps";

/**
 * Creates a {@link IMultiSelectItem} with the given {@link options} and sets the given {@link key} as selected option.
 */
const createMultiSelectItem = <T>(
  options: ISelectOption<T>[],
  key: T
): IMultiSelectItem<T> => {
  return {
    id: uuid(),
    options,
    selected:
      options.find((option) => option.key === key) ??
      error(
        "Error while creating select options. 'Selected' must be part of 'options'."
      ),
  };
};

/**
 * Creates a list with {@link IMultiSelectItem}s with the given {@link options} and sets the given {@link keys} as selected options.
 */
const createMultiSelectItems = <T>(
  options: ISelectOption<T>[],
  keys: T[]
): IMultiSelectItem<T>[] =>
  isNotInitial(options)
    ? keys.map((key) => createMultiSelectItem(options, key))
    : [];

/**
 * Returns the keys of the select options, which are in use, which means which are selected.
 */
const findSelectedKeys = <T>(
  multiSelectItems: IMultiSelectItem<T>[]
): Set<T> => {
  const selectedKeys = new Set<T>();
  for (const multiSelectItem of multiSelectItems) {
    selectedKeys.add(multiSelectItem.selected.key);
  }
  return selectedKeys;
};

/**
 * Updates the options of each multiSelectItem. If an option is selected, is must not be available for another selection.
 */
const updateOptions = <T>(
  multiSelectItems: IMultiSelectItem<T>[],
  options: ISelectOption<T>[]
): IMultiSelectItem<T>[] => {
  const selectedKeys = findSelectedKeys(multiSelectItems);

  // Filter free options (which are not in use, so currently free, which can be selected) or an option in case it is the selected option of the multiSelectItem
  multiSelectItems.forEach((multiSelectItem) => {
    multiSelectItem.options = options.filter(
      (option) =>
        option.key === multiSelectItem.selected.key ||
        !selectedKeys.has(option.key)
    );
  });
  return multiSelectItems;
};

export const useMultiSelectListViewModel = <T>(
  props: IMultiSelectListProps<T>
) => {
  const [multiSelectItems, setMultiSelectItems] = useState<
    IMultiSelectItem<T>[]
  >(createMultiSelectItems(props.options, props.selected ?? []));

  useEffect(() => {
    setMultiSelectItems(
      updateOptions(
        createMultiSelectItems(props.options, props.selected ?? []),
        props.options
      )
    );
  }, [props.options, props.selected]);

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

  const raiseOnChange = (multiSelectItems: IMultiSelectItem<T>[]) =>
    props.onChange?.(
      multiSelectItems.map((multiSelectItem) => multiSelectItem.selected.key)
    );

  const handleMultiSelectItemsChange = (
    multiSelectItems: IMultiSelectItem<T>[]
  ) => {
    updateOptions(multiSelectItems, props.options);
    raiseOnChange(multiSelectItems);
  };

  const onAdd = () => {
    // find the next free option
    const toBeSelected = findNextFreeOption(multiSelectItems);
    if (!toBeSelected) {
      props.onAddNoEntry?.();
      return;
    }

    setMultiSelectItems((previous) => {
      // add new entry with the next free option
      previous.push({
        id: uuid(),
        options: props.options,
        selected: toBeSelected,
      });

      handleMultiSelectItemsChange(previous);
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

      handleMultiSelectItemsChange(previous);
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

      handleMultiSelectItemsChange(previous);
      return [...previous];
    });
  };

  return { multiSelectItems, onAdd, onDelete, onSelect };
};
