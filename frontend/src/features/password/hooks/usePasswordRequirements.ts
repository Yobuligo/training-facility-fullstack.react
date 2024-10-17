import { useMemo } from "react";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { PasswordHasLowercaseLetter } from "../../../services/password/PasswordHasLowercaseLetter";
import { PasswordHasMinLength } from "../../../services/password/PasswordHasMinLength";
import { PasswordHasSpecialCharacter } from "../../../services/password/PasswordHasSpecialCharacter";
import { PasswordHasUppercaseLetter } from "../../../services/password/PasswordHasUppercaseLetter";
import { IPasswordRequirement } from "../types/IPasswordRequirement";

export const usePasswordRequirements = (): IPasswordRequirement[] => {
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

  return passwordRequirements;
};
