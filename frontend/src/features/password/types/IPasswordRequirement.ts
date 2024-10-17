import { IPasswordRequirementCheck } from "../../../services/password/IPasswordRequirementCheck";

export interface IPasswordRequirement {
  check: IPasswordRequirementCheck;
  title: string;
}
