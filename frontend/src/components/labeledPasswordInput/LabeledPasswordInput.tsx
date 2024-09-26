import { VisibilityIcon } from "../../icons/VisibilityIcon";
import { LabeledInput } from "../labeledInput/LabeledInput";
import { ILabeledPasswordInputProps } from "./ILabeledPasswordInputProps";
import styles from "./LabeledPasswordInput.module.scss";

export const LabeledPasswordInput: React.FC<ILabeledPasswordInputProps> = (
  props
) => {
  return (
    <LabeledInput {...props}>
      <VisibilityIcon className={styles.icon} />
    </LabeledInput>
  );
};
