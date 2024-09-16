import { useEffect } from "react";
import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
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
      <LabeledInput
        label={t(texts.passwordConfirmForm.newPassword)}
        type="password"
        onChange={props.setNewPassword}
      />
      <LabeledInput
        label={t(texts.passwordConfirmForm.confirmNewPassword)}
        type="password"
        onChange={props.setNewConfirmPassword}
        error={props.newConfirmPasswordError}
      />
    </>
  );
};
