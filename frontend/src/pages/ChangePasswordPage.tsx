import { ProtectedPage } from "../components/pages/protectedPage/ProtectedPage";
import { ChangePassword } from "../features/changePassword/ChangePassword";

export const ChangePasswordPage: React.FC = () => {
  return (
    <ProtectedPage>
      <ChangePassword />
    </ProtectedPage>
  );
};
