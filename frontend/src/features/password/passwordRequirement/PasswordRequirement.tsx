import { CheckIcon } from "../../../icons/CheckIcon";
import { IPasswordRequirementProps } from "./IPasswordRequirementProps";
import styles from "./PasswordRequirement.module.scss";

export const PasswordRequirement: React.FC<IPasswordRequirementProps> = (
  props
) => {
  const isValid = props.passwordRequirementCheck.isValid(props.password);

  return (
    <div className={styles.passwordRequirement}>
      <div className={styles.iconContainer}>
        {isValid && <CheckIcon className={styles.icon} />}
      </div>
      <div className={isValid ? styles.fulfilled : styles.title}>
        {props.title}
      </div>
    </div>
  );
};
