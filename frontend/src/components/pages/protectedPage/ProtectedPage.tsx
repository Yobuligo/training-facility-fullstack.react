import { Navigate } from "react-router-dom";
import { isError } from "../../../core/utils/isError";
import { useErrorMessage } from "../../../hooks/useErrorMessage";
import { useUserprofileLoader } from "../../../hooks/useUserprofileLoader";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useLogout } from "../../../lib/userSession/hooks/useLogout";
import { useSession } from "../../../lib/userSession/hooks/useSession";
import { AppRoutes } from "../../../routes/AppRoutes";
import { Spinner } from "../../spinner/Spinner";
import { SpinnerButton } from "../../spinnerButton/SpinnerButton";
import { Page } from "../page/Page";
import { PageHeader } from "../pageHeader/PageHeader";
import { IProtectedPageProps } from "./IProtectedPageProps";
import styles from "./ProtectedPage.module.scss";

export const ProtectedPage: React.FC<IProtectedPageProps> = (props) => {
  const [session] = useSession();
  const { logout, isLoggingOut } = useLogout();
  const { t } = useTranslation();
  const [, setErrorMessage] = useErrorMessage();
  const userProfileLoader = useUserprofileLoader();

  if (!session) {
    return <Navigate to={AppRoutes.login.toPath()} />;
  }

  const onLogout = async () => {
    try {
      await logout();
    } catch (error) {
      if (isError(error)) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(texts.logout.title);
      }
    }
  };

  const displaySpinner =
    !userProfileLoader.userProfile || userProfileLoader.request.isProcessing;

  return (
    <Page>
      <div className={styles.protectedPage}>
        {displaySpinner ? (
          <Spinner />
        ) : (
          <>
            <PageHeader onAppLogoClick={props.onAppLogoClick}>
              <SpinnerButton
                displaySpinner={isLoggingOut}
                onClick={onLogout}
              >{`${t(texts.logout.title)} (TODO)`}</SpinnerButton>
            </PageHeader>
            <div>{props.children}</div>
          </>
        )}
      </div>
    </Page>
  );
};
