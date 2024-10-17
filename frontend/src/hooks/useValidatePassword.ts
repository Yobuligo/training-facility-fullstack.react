import { useMemo } from "react";
import { ValidationError } from "../core/errors/ValidationError";
import { texts } from "../lib/translation/texts";
import { useTranslation } from "../lib/translation/useTranslation";

export const useValidatePassword = () => {
  const { t } = useTranslation();

  const validate = useMemo(() => {
    return (password: string) => {
      if (password.length < 8) {
        throw new ValidationError(
          t(texts.passwordValidation.errorLength, { length: "8" })
        );
      }

      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      if (!specialCharRegex.test(password)) {
        throw new ValidationError(
          t(texts.passwordValidation.errorNeedsSpecialCharacter)
        );
      }

      const numberRegex = /\d/;
      if (!numberRegex.test(password)) {
        throw new ValidationError(t(texts.passwordValidation.errorNeedsNumber));
      }

      const upperCaseRegex = /[A-Z]/;
      if (!upperCaseRegex.test(password)) {
        throw new ValidationError(
          t(texts.passwordValidation.errorNeedsUppercaseLetter)
        );
      }

      const lowerCaseRegex = /[a-z]/;
      if (!lowerCaseRegex.test(password)) {
        throw new ValidationError(
          t(texts.passwordValidation.errorNeedsLowercaseLetter)
        );
      }
    };
  }, [t]);

  return validate;
};
