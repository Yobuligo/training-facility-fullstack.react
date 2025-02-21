import { lazy, Suspense } from "react";
import { PublicPage } from "../components/pages/publicPage/PublicPage";
import { PageSpinner } from "../components/pageSpinner/PageSpinner";

const UserInvite = lazy(
  () => import("../features/users/userInvite/UserInvite")
);

export const UserInvitePage: React.FC = () => {
  return (
    <PublicPage>
      <Suspense fallback={<PageSpinner />}>
        <UserInvite />
      </Suspense>
    </PublicPage>
  );
};
