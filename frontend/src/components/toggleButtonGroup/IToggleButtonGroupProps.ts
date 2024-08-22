import { IToggleButtonOption } from "./IToggleButtonOption";

export interface IToggleButtonGroupProps<T extends IToggleButtonOption<any>> {
  disabled?: boolean;
  items: T[];
  onChange?: (selected: T | undefined) => void;
  onSelect?: (selected: T) => void;
  selected?: T;
}
