import { IPasswordRequirementCheck } from "./IPasswordRequirementCheck";

export class PasswordHasMinLength implements IPasswordRequirementCheck {
  constructor(private minLength: number) {}

  isValid(password: string): boolean {
    return password.length >= this.minLength;
  }
}
