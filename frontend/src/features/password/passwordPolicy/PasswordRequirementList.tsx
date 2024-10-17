import { style } from "../../../core/ui/style";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { PasswordRequirement } from "../passwordRequirement/PasswordRequirement";
import { IPasswordRequirementListProps } from "./IPasswordRequirementListProps";
import styles from "./PasswordRequirementList.module.scss";

/**
 * This component is responsible for displaying a list of password requirements, which have to be fulfilled for a password.
 */
export const PasswordRequirementList: React.FC<
  IPasswordRequirementListProps
> = (props) => {
  const { t } = useTranslation();

  const items = props.passwordRequirements.map((passwordRequirement, index) => (
    <PasswordRequirement
      key={index}
      password={props.password}
      passwordRequirementCheck={passwordRequirement.check}
      title={passwordRequirement.title}
    />
  ));

  return (
    <div className={style(styles.passwordPolicy, props.className)}>
      <div className={styles.title}>
        {t(texts.passwordValidation.passwordMustContain)}
      </div>
      {items}
    </div>
  );
};
