import { UseLabeledElement } from "../../../hooks/types/UseLabeledElement";
import { IPasswordRequirement } from "../types/IPasswordRequirement";

export interface IPasswordConfirmFormProps {
  autoFocus?: boolean;
  newConfirmPassword: UseLabeledElement<string>;
  newPassword: UseLabeledElement<string>;
  passwordRequirements: IPasswordRequirement[];
}
