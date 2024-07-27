import { useId } from "react";
import { LabeledElement } from "../labeledElement/LabeledElement";
import { ISelectOption } from "../select/ISelectOption";
import { Select } from "../select/Select";
import { ILabeledSelectProps } from "./ILabeledSelectProps";

export function LabeledSelect<T extends ISelectOption>(
  props: ILabeledSelectProps<T>
) {
  const id = useId();
  return (
    <LabeledElement elementId={id} label={props.label}>
      <Select
        onSelect={props.onSelect}
        selected={props.selected}
        options={props.options}
      />
    </LabeledElement>
  );
}
