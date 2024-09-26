import { useId } from "react";
import { style } from "../../core/ui/style";
import { VisibilityIcon } from "../../icons/VisibilityIcon";
import { LabeledElement } from "../labeledElement/LabeledElement";
import labeledInputStyles from "../labeledInput/LabeledInput.module.scss";
import { ILabeledPasswordInputProps } from "./ILabeledPasswordInputProps";
import styles from "./LabeledPasswordInput.module.scss";

export const LabeledPasswordInput: React.FC<ILabeledPasswordInputProps> = (
  props
) => {
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
      elementId={id}
      error={props.error}
      isOptional={props.isOptional}
      label={props.label}
    >
      <div className={styles.labeledPasswordInput}>
        <input
          className={style(
            props.classNameInput,
            labeledInputStyles.labeledInput,
            styles.input,
            props.disabled ? labeledInputStyles.inputDisabled : "",
            props.error ? labeledInputStyles.error : ""
          )}
          disabled={props.disabled}
          id={id}
          maxLength={props.maxLength}
          onChange={onChange}
          onKeyDown={onKeyDown}
          type={"password"}
          value={props.value}
        />
        <VisibilityIcon className={styles.icon} />
      </div>
    </LabeledElement>
  );
};
