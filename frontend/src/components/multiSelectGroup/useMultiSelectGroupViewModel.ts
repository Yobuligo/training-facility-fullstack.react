import { useState } from "react";
import { ISelectOption } from "../select/ISelectOption";
import { IMultiSelectGroupProps } from "./IMultiSelectGroupProps";

interface IMultiSelectGroupItem<T> {
  selectOptions: ISelectOption<T>[];
}

export const useMultiSelectGroupViewModel = <T>(
  props: IMultiSelectGroupProps<T>
) => {
  const [multiSelectGroupItems, setMultiSelectGroupItems] = useState<
    IMultiSelectGroupItem<T>[]
  >([{ selectOptions: props.options }]);

  return { multiSelectGroupItems };
};
