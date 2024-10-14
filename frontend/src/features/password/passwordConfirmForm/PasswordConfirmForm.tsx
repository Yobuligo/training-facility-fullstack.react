import { useEffect } from "react";
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

  useEffect(() => {
    if (props.newConfirmPassword[0] !== "") {
      if (props.newPassword[0] !== props.newConfirmPassword[0]) {
        props.newConfirmPassword[3](
          t(texts.passwordConfirmForm.passwordsNotIdentical)
        );
      } else {
        props.newConfirmPassword[3]("");
      }
    }
  }, [props.newConfirmPassword, props.newPassword, t, validatePassword]);

  useEffect(() => {
    if (isNotInitial(props.newPassword[0])) {
      try {
        validatePassword(props.newPassword[0]);
        props.newPassword[3]("");
      } catch (error) {
        if (error instanceof ValidationError) {
          props.newPassword[3](error.message);
        } else {
          props.newPassword[3](t(texts.passwordConfirmForm.errorUnknownError));
        }
      }
    }
  }, [props.newPassword, t, validatePassword]);

  return (
    <>
      <LabeledPasswordInput
        autoFocus={props.autoFocus}
        error={props.newPassword[2]}
        label={t(texts.passwordConfirmForm.newPassword)}
        onChange={props.newPassword[1]}
      />
      <LabeledPasswordInput
        error={props.newConfirmPassword[2]}
        label={t(texts.passwordConfirmForm.confirmNewPassword)}
        onChange={props.newConfirmPassword[1]}
      />
    </>
  );
};
