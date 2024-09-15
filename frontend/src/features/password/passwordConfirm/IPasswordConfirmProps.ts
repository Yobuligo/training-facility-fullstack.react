export interface IPasswordConfirmProps {
  newConfirmPassword: string;
  newConfirmPasswordError: string;
  newPassword: string;
  setNewConfirmPasswordError: (
    value: string | ((prevState: string) => string)
  ) => void;
  setNewConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
}
