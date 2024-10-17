import { LabeledPasswordInput } from "../../../components/labeledPasswordInput/LabeledPasswordInput";
import { isNotInitial } from "../../../core/utils/isNotInitial";
import { useDebounce } from "../../../hooks/useDebounce";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { PasswordRequirementList } from "../passwordPolicy/PasswordRequirementList";
import { IPasswordConfirmFormProps } from "./IPasswordConfirmFormProps";
import styles from "./PasswordConfirmForm.module.scss";

export const PasswordConfirmForm: React.FC<IPasswordConfirmFormProps> = (
  props
) => {
  const { t } = useTranslation();
  const debounceNewPassword = useDebounce();
  const debounceNewConfirmPassword = useDebounce();

  const onValidateNewPassword = (newPassword: string) => {
    if (isNotInitial(newPassword)) {
      onValidateNewConfirmPassword(props.newConfirmPassword[0], newPassword);
    }
  };

  const onNewPasswordChangeDebounce = (newPassword: string) =>
    debounceNewPassword(() => {
      props.newPassword[1](newPassword);
      onValidateNewPassword(newPassword);
    }, 300);

  const onValidateNewConfirmPassword = (
    newConfirmPassword: string,
    newPassword: string
  ) => {
    if (isNotInitial(newConfirmPassword)) {
      if (newPassword !== newConfirmPassword) {
        props.newConfirmPassword[3](
          t(texts.passwordConfirmForm.passwordsNotIdentical)
        );
      } else {
        props.newConfirmPassword[3]("");
      }
    } else {
      props.newConfirmPassword[3]("");
    }
  };

  const onNewConfirmPasswordChangeDebounce = (newConfirmPassword: string) =>
    debounceNewConfirmPassword(() => {
      props.newConfirmPassword[1](newConfirmPassword);
      onValidateNewConfirmPassword(newConfirmPassword, props.newPassword[0]);
    }, 300);

  return (
    <>
      <PasswordRequirementList
        className={styles.passwordPolicy}
        password={props.newPassword[0]}
        passwordRequirements={props.passwordRequirements}
      />
      <LabeledPasswordInput
        autoFocus={props.autoFocus}
        error={props.newPassword[2]}
        label={t(texts.passwordConfirmForm.newPassword)}
        onChange={onNewPasswordChangeDebounce}
      />
      <LabeledPasswordInput
        error={props.newConfirmPassword[2]}
        label={t(texts.passwordConfirmForm.confirmNewPassword)}
        onChange={onNewConfirmPasswordChangeDebounce}
      />
    </>
  );
};
