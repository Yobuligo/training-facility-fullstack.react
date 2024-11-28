import { useId } from "react";
import { LabeledElement } from "../labeledElement/LabeledElement";
import { Switch } from "../switch/Switch";
import { ILabeledSwitchProps } from "./ILabeledSwitchProps";

export const LabeledSwitch: React.FC<ILabeledSwitchProps> = (props) => {
  const id = useId();

  return (
    <LabeledElement
      className={props.className}
      elementId={id}
      error={props.error}
      infoText={props.infoText}
      isOptional={props.isOptional}
      label={props.label}
    >
      <Switch
        checked={props.checked}
        disabled={props.disabled}
        onChange={props.onChange}
        width="4rem"
      />
    </LabeledElement>
  );
};
