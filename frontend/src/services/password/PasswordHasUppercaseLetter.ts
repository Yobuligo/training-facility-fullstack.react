import { IPasswordRequirementCheck } from "./IPasswordRequirementCheck";

export class PasswordHasUppercaseLetter implements IPasswordRequirementCheck {
  isValid(password: string): boolean {
    const upperCaseRegex = /[A-Z]/;
    return upperCaseRegex.test(password);
  }
}
