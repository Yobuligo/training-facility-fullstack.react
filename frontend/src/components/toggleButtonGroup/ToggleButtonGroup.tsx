import { useState } from "react";
import { ToggleButton } from "../toggleButton/ToggleButton";
import { IToggleButtonGroupProps } from "./IToggleButtonGroupProps";
import { IToggleButtonOption } from "./IToggleButtonOption";
import styles from "./ToggleButtonGroup.module.scss";

export function ToggleButtonGroup<T extends IToggleButtonOption<any>>(
  props: IToggleButtonGroupProps<T>
) {
  const [selected, setSelected] = useState<T | undefined>(props.selected);
  const items = props.items.map((item) => {
    return (
      <ToggleButton
        disabled={props.disabled}
        item={item}
        onClick={() => {
          if (item === selected) {
            setSelected(undefined);
          } else {
            setSelected(item);
            props.onSelect?.(item);
          }
        }}
        selected={item === selected}
      />
    );
  });

  return <div className={styles.toggleButtonGroup}>{items}</div>;
}
