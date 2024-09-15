import { useNavigate } from "react-router-dom";
import { ProtectedPage } from "../components/pages/protectedPage/ProtectedPage";
import { PasswordChange } from "../features/password/passwordChange/PasswordChange";
import { AppRoutes } from "../routes/AppRoutes";

export const ChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ProtectedPage
      onAppLogoClick={() => navigate(AppRoutes.dashboard.toPath())}
    >
      <PasswordChange />
    </ProtectedPage>
  );
};
