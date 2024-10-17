import { IPasswordRequirementCheck } from "./IPasswordRequirementCheck";

export class PasswordHasNumber implements IPasswordRequirementCheck {
  isValid(password: string): boolean {
    const numberRegex = /\d/;
    return numberRegex.test(password);
  }
}
