import { useState } from "react";
import { LabeledPasswordInput } from "../../../components/labeledPasswordInput/LabeledPasswordInput";
import { ValidationError } from "../../../core/errors/ValidationError";
import { isNotInitial } from "../../../core/utils/isNotInitial";
import { useValidatePassword } from "../../../hooks/useValidatePassword";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { IPasswordConfirmFormProps } from "./IPasswordConfirmFormProps";

export const PasswordConfirmForm: React.FC<IPasswordConfirmFormProps> = (
  props
) => {
  const { t } = useTranslation();
  const validatePassword = useValidatePassword();
  const [newPasswordTimeout, setNewPasswordTimeout] = useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const [newConfirmPasswordTimeout, setNewConfirmPasswordTimeout] = useState<
    NodeJS.Timeout | undefined
  >(undefined);

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

  const onNewPasswordChangeDebounce = (newPassword: string) => {
    clearTimeout(newPasswordTimeout);
    const timeout = setTimeout(() => {
      props.newPassword[1](newPassword);
      onValidateNewPassword(newPassword);
    }, 300);
    setNewPasswordTimeout(timeout);
  };

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

  const onNewConfirmPasswordChangeDebounce = (newConfirmPassword: string) => {
    clearTimeout(newConfirmPasswordTimeout);
    const timeout = setTimeout(() => {
      props.newConfirmPassword[1](newConfirmPassword);
      onValidateNewConfirmPassword(newConfirmPassword, props.newPassword[0]);
    }, 300);
    setNewConfirmPasswordTimeout(timeout);
  };

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
