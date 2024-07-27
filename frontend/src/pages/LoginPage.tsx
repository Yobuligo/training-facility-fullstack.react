import { PublicPage } from "../components/pages/publicPage/PublicPage";
import { Login } from "../features/login/Login";

export const LoginPage: React.FC = () => {
  return (
    <PublicPage>
      <Login />
    </PublicPage>
  );
};
