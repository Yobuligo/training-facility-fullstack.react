import { lazy, Suspense } from "react";
import { PublicPage } from "../components/pages/publicPage/PublicPage";
import { PageSpinner } from "../components/pageSpinner/PageSpinner";

export const UserInvitePage: React.FC = () => {
  const UserInvite = lazy(
    () => import("../features/users/userInvite/UserInvite")
  );

  return (
    <PublicPage>
      <Suspense fallback={<PageSpinner />}>
        <UserInvite />
      </Suspense>
    </PublicPage>
  );
};
