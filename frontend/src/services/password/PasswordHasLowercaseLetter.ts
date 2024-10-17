import { IPasswordRequirementCheck } from "./IPasswordRequirementCheck";

export class PasswordHasLowercaseLetter implements IPasswordRequirementCheck {
  isValid(password: string): boolean {
    const lowerCaseRegex = /[a-z]/;
    return lowerCaseRegex.test(password);
  }
}
