import { Navigate } from "react-router-dom";
import { isError } from "../../../core/utils/isError";
import { useUserLoader } from "../../../hooks/useUserLoader";
import { useToast } from "../../../lib/toast/hooks/useToast";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useLogout } from "../../../lib/userSession/hooks/useLogout";
import { useSession } from "../../../lib/userSession/hooks/useSession";
import { AppRoutes } from "../../../routes/AppRoutes";
import { PageSpinner } from "../../pageSpinner/PageSpinner";
import { SpinnerButton } from "../../spinnerButton/SpinnerButton";
import { Page } from "../page/Page";
import { PageHeader } from "../pageHeader/PageHeader";
import { IProtectedPageProps } from "./IProtectedPageProps";
import styles from "./ProtectedPage.module.scss";

export const ProtectedPage: React.FC<IProtectedPageProps> = (props) => {
  const [session] = useSession();
  const { logout, isLoggingOut } = useLogout();
  const { t } = useTranslation();
  const userLoader = useUserLoader();
  const toast = useToast();

  if (!session) {
    return <Navigate to={AppRoutes.login.toPath()} />;
  }

  const onLogout = async () => {
    try {
      await logout();
    } catch (error) {
      if (isError(error)) {
        toast.error(error.message);
      } else {
        toast.error(texts.logout.title);
      }
    }
  };

  const displaySpinner = userLoader.isProcessing || !userLoader.user;

  return (
    <Page>
      <div className={styles.protectedPage}>
        <PageHeader onAppLogoClick={props.onAppLogoClick}>
          {!displaySpinner && (
            <SpinnerButton
              displaySpinner={isLoggingOut}
              onClick={onLogout}
            >{`${t(texts.logout.title)} (${
              userLoader.user?.userProfile.firstname
            })`}</SpinnerButton>
          )}
        </PageHeader>
        {displaySpinner ? (
          <div className={styles.spinner}>
            <PageSpinner />
          </div>
        ) : (
          <div>{props.children}</div>
        )}
      </div>
    </Page>
  );
};
