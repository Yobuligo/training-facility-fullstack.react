import { Error } from "../components/error/Error";
import { PublicPage } from "../components/pages/publicPage/PublicPage";

export const ErrorPage: React.FC = () => {
  return (
    <PublicPage>
      <Error />
    </PublicPage>
  );
};
