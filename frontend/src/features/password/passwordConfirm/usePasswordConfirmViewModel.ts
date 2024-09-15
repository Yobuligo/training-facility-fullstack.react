import { useEffect, useState } from "react";
import { useLabeledElement } from "../../../hooks/useLabeledElement";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";

export const usePasswordConfirmViewModel = () => {
  const { t } = useTranslation();
  const [newPassword, setNewPassword] = useState("");
  const [
    newConfirmPassword,
    setNewConfirmPassword,
    newConfirmPasswordError,
    SetNewConfirmPasswordError,
  ] = useLabeledElement("");

  useEffect(() => {
    if (newConfirmPassword !== "") {
      if (newPassword !== newConfirmPassword) {
        SetNewConfirmPasswordError(
          t(texts.changePassword.passwordsNotIdentical)
        );
      } else {
        SetNewConfirmPasswordError("");
      }
    }
  }, [newPassword, newConfirmPassword, SetNewConfirmPasswordError, t]);

  return { newConfirmPasswordError, setNewConfirmPassword, setNewPassword };
};
