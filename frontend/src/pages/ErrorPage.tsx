import { useNavigate } from "react-router-dom";
import { Error } from "../components/error/Error";
import { PublicPage } from "../components/pages/publicPage/PublicPage";
import { AppRoutes } from "../routes/AppRoutes";

export const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PublicPage onAppLogoClick={() => navigate(AppRoutes.dashboard.toPath())}>
      <Error />
    </PublicPage>
  );
};
