import { useState } from "react";
import { ISelectOption } from "./../components/select/ISelectOption";

export const useSelectOption = <TKey>(
  initialValue: TKey,
  selectOptions: ISelectOption<TKey>[]
): [
  selectOptions: ISelectOption<TKey>[],
  selectedValue: ISelectOption<TKey> | undefined,
  onSelectedValueChange: (option: ISelectOption<TKey>) => void
] => {
  const [value, setValue] = useState(initialValue);

  const selectedValue = selectOptions.find(
    (selectOption) => selectOption.key === value
  );

  const onSelectedValueChange = (option: ISelectOption<TKey>) =>
    setValue(option.key);

  return [selectOptions, selectedValue, onSelectedValueChange];
};
