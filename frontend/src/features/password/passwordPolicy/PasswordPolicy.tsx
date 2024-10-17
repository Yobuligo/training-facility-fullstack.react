import { style } from "../../../core/ui/style";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { PasswordHasLowercaseLetter } from "../../../services/password/PasswordHasLowercaseLetter";
import { PasswordHasMinLength } from "../../../services/password/PasswordHasMinLength";
import { PasswordHasNumber } from "../../../services/password/PasswordHasNumber";
import { PasswordHasSpecialCharacter } from "../../../services/password/PasswordHasSpecialCharacter";
import { PasswordHasUppercaseLetter } from "../../../services/password/PasswordHasUppercaseLetter";
import { PasswordRequirement } from "../passwordRequirement/PasswordRequirement";
import { IPasswordPolicyProps } from "./IPasswordPolicyProps";
import styles from "./PasswordPolicy.module.scss";

export const PasswordPolicy: React.FC<IPasswordPolicyProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className={style(styles.passwordPolicy, props.className)}>
      <div className={styles.title}>
        {t(texts.passwordValidation.passwordMustContain)}
      </div>
      <PasswordRequirement
        password={props.password}
        passwordRequirementCheck={new PasswordHasMinLength(8)}
        title={t(texts.passwordValidation.errorLength, { length: "8" })}
      />
      <PasswordRequirement
        password={props.password}
        passwordRequirementCheck={new PasswordHasUppercaseLetter()}
        title={t(texts.passwordValidation.errorNeedsUppercaseLetter)}
      />
      <PasswordRequirement
        password={props.password}
        passwordRequirementCheck={new PasswordHasLowercaseLetter()}
        title={t(texts.passwordValidation.errorNeedsLowercaseLetter)}
      />
      <PasswordRequirement
        password={props.password}
        passwordRequirementCheck={new PasswordHasNumber()}
        title={t(texts.passwordValidation.errorNeedsNumber)}
      />
      <PasswordRequirement
        password={props.password}
        passwordRequirementCheck={new PasswordHasSpecialCharacter()}
        title={t(texts.passwordValidation.errorNeedsSpecialCharacter)}
      />
    </div>
  );
};
