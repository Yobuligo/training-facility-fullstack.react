import { LabeledPasswordInput } from "../../../components/labeledPasswordInput/LabeledPasswordInput";
import { ValidationError } from "../../../core/errors/ValidationError";
import { isNotInitial } from "../../../core/utils/isNotInitial";
import { useDebounce } from "../../../hooks/useDebounce";
import { useValidatePassword } from "../../../hooks/useValidatePassword";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { IPasswordConfirmFormProps } from "./IPasswordConfirmFormProps";

export const PasswordConfirmForm: React.FC<IPasswordConfirmFormProps> = (
  props
) => {
  const { t } = useTranslation();
  const validatePassword = useValidatePassword();
  const debounceNewPassword = useDebounce();
  const debounceNewConfirmPassword = useDebounce();

  const onValidateNewPassword = (newPassword: string) => {
    if (isNotInitial(newPassword)) {
      try {
        validatePassword(newPassword);
        props.newPassword[3]("");
        onValidateNewConfirmPassword(props.newConfirmPassword[0], newPassword);
      } catch (error) {
        if (error instanceof ValidationError) {
          props.newPassword[3](error.message);
        } else {
          props.newPassword[3](t(texts.passwordConfirmForm.errorUnknownError));
        }
      }
    } else {
      props.newPassword[3]("");
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
