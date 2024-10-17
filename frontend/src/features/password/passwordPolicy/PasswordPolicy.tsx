import { style } from "../../../core/ui/style";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { PasswordRequirement } from "../passwordRequirement/PasswordRequirement";
import { IPasswordPolicyProps } from "./IPasswordPolicyProps";
import styles from "./PasswordPolicy.module.scss";

export const PasswordPolicy: React.FC<IPasswordPolicyProps> = (props) => {
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
