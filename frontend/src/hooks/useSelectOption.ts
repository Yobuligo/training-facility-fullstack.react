import { useState } from "react";
import { ISelectOption } from "./../components/select/ISelectOption";

export const useSelectOption = <TKey>(
  initialValue: TKey,
  selectOptions: ISelectOption<TKey>[]
): [
  value: TKey,
  ISelectOption<TKey>[],
  ISelectOption<TKey> | undefined,
  (option: ISelectOption<TKey>) => void
] => {
  const [value, setValue] = useState(initialValue);

  const selectedOption = selectOptions.find(
    (selectOption) => selectOption.key === value
  );

  const onSelectedValueChange = (option: ISelectOption<TKey>) =>
    setValue(option.key);

  return [value, selectOptions, selectedOption, onSelectedValueChange];
};
