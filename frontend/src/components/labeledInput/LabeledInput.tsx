import { useId } from "react";
import { style } from "../../core/ui/style";
import { LabeledElement } from "../labeledElement/LabeledElement";
import { ILabeledInputProps } from "./ILabeledInputProps";
import styles from "./LabeledInput.module.scss";

export const LabeledInput: React.FC<ILabeledInputProps> = (props) => {
  const id = useId();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    props.onChange?.(event.target.value);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      props.onEnter?.();
    }
  };

  return (
    <LabeledElement
      className={props.className}
      elementId={id}
      error={props.error}
      isOptional={props.isOptional}
      label={props.label}
    >
      <div className={styles.inputContainer}>
        <input
          autoFocus={props.autoFocus}
          className={style(
            props.classNameInput,
            styles.labeledInput,
            props.disabled ? styles.inputDisabled : "",
            props.error ? styles.error : ""
          )}
          disabled={props.disabled}
          id={id}
          maxLength={props.maxLength}
          onChange={onChange}
          onKeyDown={onKeyDown}
          type={props.type ?? "text"}
          value={props.value}
        />
        {props.children}
      </div>
    </LabeledElement>
  );
};
