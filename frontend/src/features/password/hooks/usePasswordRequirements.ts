import { useMemo } from "react";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { PasswordHasLowercaseLetter } from "../../../services/password/PasswordHasLowercaseLetter";
import { PasswordHasMinLength } from "../../../services/password/PasswordHasMinLength";
import { PasswordHasSpecialCharacter } from "../../../services/password/PasswordHasSpecialCharacter";
import { PasswordHasUppercaseLetter } from "../../../services/password/PasswordHasUppercaseLetter";
import { IPasswordRequirement } from "../types/IPasswordRequirement";

/**
 * This hook is responsible for returning all password requirements which have to be checked when setting a password.
 */
export const usePasswordRequirements = (): [
  passwordRequirements: IPasswordRequirement[],
  areValid: (password: string) => boolean
] => {
  const { t } = useTranslation();

  const passwordRequirements: IPasswordRequirement[] = useMemo(
    () => [
      {
        check: new PasswordHasMinLength(8),
        title: t(texts.passwordValidation.errorLength, { length: "8" }),
      },
      {
        check: new PasswordHasUppercaseLetter(),
        title: t(texts.passwordValidation.errorNeedsUppercaseLetter),
      },
      {
        check: new PasswordHasLowercaseLetter(),
        title: t(texts.passwordValidation.errorNeedsLowercaseLetter),
      },
      {
        check: new PasswordHasSpecialCharacter(),
        title: t(texts.passwordValidation.errorNeedsSpecialCharacter),
      },
    ],
    [t]
  );

  /**
   * Returns if all passwordRequirements are valid, otherwise false.
   */
  const areValid = (password: string): boolean => {
    for (const passwordRequirement of passwordRequirements) {
      if (!passwordRequirement.check.isValid(password)) {
        return false;
      }
    }
    return true;
  };

  return [passwordRequirements, areValid];
};
