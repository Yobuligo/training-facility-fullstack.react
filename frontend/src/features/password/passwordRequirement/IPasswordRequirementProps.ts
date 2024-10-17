import { IPasswordRequirementCheck } from "../../../services/password/IPasswordRequirementCheck";

export interface IPasswordRequirementProps {
  passwordRequirementCheck: IPasswordRequirementCheck;
  password: string;
  title: string;
}
