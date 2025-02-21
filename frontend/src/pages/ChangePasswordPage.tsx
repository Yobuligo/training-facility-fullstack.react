import { lazy, Suspense } from "react";
import { ProtectedPage } from "../components/pages/protectedPage/ProtectedPage";
import { PageSpinner } from "../components/pageSpinner/PageSpinner";

const PasswordChange = lazy(
  () => import("../features/password/passwordChange/PasswordChange")
);

export const ChangePasswordPage: React.FC = () => {
  return (
    <ProtectedPage>
      <Suspense fallback={<PageSpinner />}>
        <PasswordChange />
      </Suspense>
    </ProtectedPage>
  );
};
