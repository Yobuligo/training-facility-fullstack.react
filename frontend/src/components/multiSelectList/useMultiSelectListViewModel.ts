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

  const onAdd = () => {
    setMultiSelectItems((previous) => {
      previous.push({
        id: uuid(),
        options: props.options,
        selected: props.options[0],
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
