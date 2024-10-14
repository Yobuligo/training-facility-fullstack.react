import { UseLabeledElement } from "../../../hooks/types/UseLabeledElement";

export interface IPasswordConfirmFormProps {
  autoFocus?: boolean;
  newConfirmPassword: UseLabeledElement<string>,
  newPassword: UseLabeledElement<string>
  // newConfirmPassword: string;
  // newConfirmPasswordError: string;
  // newPassword: string;
  // setNewConfirmPasswordError: (
  //   value: string | ((prevState: string) => string)
  // ) => void;
  // setNewConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  // setNewPassword: React.Dispatch<React.SetStateAction<string>>;
}
