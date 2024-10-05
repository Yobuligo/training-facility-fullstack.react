import { useId } from "react";
import { style } from "../../core/ui/style";
import { LabeledElement } from "../labeledElement/LabeledElement";
import { ISelectOption } from "../select/ISelectOption";
import { Select } from "../select/Select";
import { ILabeledSelectProps } from "./ILabeledSelectProps";
import styles from "./LabeledSelect.module.scss";

export function LabeledSelect<T>(props: ILabeledSelectProps<T>) {
  const id = useId();

  const onSelectValue = (selectedValue: ISelectOption<T>) => {
    props.onSelect?.(selectedValue.key);
  };

  const selectedValue = props.options.find(
    (option) => option.key === props.value
  );

  return (
    <LabeledElement
      className={props.className}
      elementId={id}
      error={props.error}
      isOptional={props.isOptional}
      label={props.label}
    >
      <Select
        className={style(
          styles.select,
          props.disabled ? styles.selectDisabled : "",
          props.error ? styles.error : ""
        )}
        disabled={props.disabled}
        onSelect={onSelectValue}
        selected={selectedValue}
        options={props.options}
      />
    </LabeledElement>
  );
}
