import { Navigate } from "react-router-dom";
import { isError } from "../../../core/utils/isError";
import { useErrorMessage } from "../../../hooks/useErrorMessage";
import { useUserLoader } from "../../../hooks/useUserLoader";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useLogout } from "../../../lib/userSession/hooks/useLogout";
import { useSession } from "../../../lib/userSession/hooks/useSession";
import { AppRoutes } from "../../../routes/AppRoutes";
import colors from "../../../styles/colors.module.scss";
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
  const userLoader = useUserLoader();

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
            <Spinner color={colors.colorSecondary} />
          </div>
        ) : (
          <div>{props.children}</div>
        )}
      </div>
    </Page>
  );
};
