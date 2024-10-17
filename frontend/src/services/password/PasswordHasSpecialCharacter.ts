import { IPasswordRequirementCheck } from "./IPasswordRequirementCheck";

export class PasswordHasSpecialCharacter implements IPasswordRequirementCheck {
  isValid(password: string): boolean {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharRegex.test(password);
  }
}
