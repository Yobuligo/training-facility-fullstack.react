import { IPasswordRequirement } from "../types/IPasswordRequirement";

export interface IPasswordRequirementListProps {
  className?: string;
  password: string;
  passwordRequirements: IPasswordRequirement[];
}
