import { ProtectedPage } from "../components/pages/protectedPage/ProtectedPage";
import { PasswordChange } from "../features/password/passwordChange/PasswordChange";

export const ChangePasswordPage: React.FC = () => {
  return (
    <ProtectedPage>
      <PasswordChange />
    </ProtectedPage>
  );
};
