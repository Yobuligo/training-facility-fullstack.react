import { useEffect } from "react";
import { LabeledPasswordInput } from "../../../components/labeledPasswordInput/LabeledPasswordInput";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { IPasswordConfirmFormProps } from "./IPasswordConfirmFormProps";

export const PasswordConfirmForm: React.FC<IPasswordConfirmFormProps> = (
  props
) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (props.newConfirmPassword !== "") {
      if (props.newPassword !== props.newConfirmPassword) {
        props.setNewConfirmPasswordError(
          t(texts.passwordConfirmForm.passwordsNotIdentical)
        );
      } else {
        props.setNewConfirmPasswordError("");
      }
    }
  }, [props, t]);

  return (
    <>
      <LabeledPasswordInput
        label={t(texts.passwordConfirmForm.newPassword)}
        onChange={props.setNewPassword}
      />
      <LabeledPasswordInput
        label={t(texts.passwordConfirmForm.confirmNewPassword)}
        onChange={props.setNewConfirmPassword}
        error={props.newConfirmPasswordError}
      />
    </>
  );
};
