import { useEffect } from "react";
import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { IPasswordConfirmProps } from "./IPasswordConfirmProps";

export const PasswordConfirm: React.FC<IPasswordConfirmProps> = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (props.newConfirmPassword !== "") {
      if (props.newPassword !== props.newConfirmPassword) {
        props.setNewConfirmPasswordError(
          t(texts.changePassword.passwordsNotIdentical)
        );
      } else {
        props.setNewConfirmPasswordError("");
      }
    }
  }, [props, t]);

  return (
    <>
      <LabeledInput
        label={t(texts.passwordConfirm.newPassword)}
        type="password"
        onChange={props.setNewPassword}
      />
      <LabeledInput
        label={t(texts.changePassword.confirmNewPassword)}
        type="password"
        onChange={props.setNewConfirmPassword}
        error={props.newConfirmPasswordError}
      />
    </>
  );
};
