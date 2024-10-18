import { useNavigate } from "react-router-dom";
import { PublicPage } from "../components/pages/publicPage/PublicPage";
import { Login } from "../features/login/Login";
import { AppRoutes } from "../routes/AppRoutes";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PublicPage onAppLogoClick={() => navigate(AppRoutes.dashboard.toPath())}>
      <Login />
    </PublicPage>
  );
};
