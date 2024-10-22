import { useState } from "react";
import { ISelectOption } from "../select/ISelectOption";
import { IMultiSelectListProps } from "./IMultiSelectListProps";

interface IMultiSelectGroupItem<T> {
  selectOptions: ISelectOption<T>[];
}

export const useMultiSelectGroupViewModel = <T>(
  props: IMultiSelectListProps<T>
) => {
  const [multiSelectGroupItems, setMultiSelectGroupItems] = useState<
    IMultiSelectGroupItem<T>[]
  >([{ selectOptions: props.options }]);

  return { multiSelectGroupItems };
};
