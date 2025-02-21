import { lazy, Suspense } from "react";
import { ProtectedPage } from "../components/pages/protectedPage/ProtectedPage";
import { PageSpinner } from "../components/pageSpinner/PageSpinner";

export const ChangePasswordPage: React.FC = () => {
  const PasswordChange = lazy(
    () => import("../features/password/passwordChange/PasswordChange")
  );

  return (
    <ProtectedPage>
      <Suspense fallback={<PageSpinner />}>
        <PasswordChange />
      </Suspense>
    </ProtectedPage>
  );
};
