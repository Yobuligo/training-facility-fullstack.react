import { IPasswordRequirement } from "../types/IPasswordRequirement";

export interface IPasswordPolicyProps {
  className?: string;
  password: string;
  passwordRequirements: IPasswordRequirement[];
}
