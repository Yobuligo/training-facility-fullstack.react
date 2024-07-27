import { Navigate } from "react-router-dom";
import { useErrorMessage } from "../../../hooks/useErrorMessage";
import { useLogout } from "../../../hooks/useLogout";
import { useSession } from "../../../hooks/useSession";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { AppRoutes } from "../../../routes/AppRoutes";
import { isError } from "../../../shared/utils/isError";
import { SpinnerButton } from "../../spinnerButton/SpinnerButton";
import { Page } from "../page/Page";
import { IProtectedPageProps } from "./IProtectedPageProps";
import styles from "./ProtectedPage.module.scss";
import { PageHeader } from "../pageHeader/PageHeader";

export const ProtectedPage: React.FC<IProtectedPageProps> = (props) => {
  const [session] = useSession();
  const { logout, isLoggingOut } = useLogout();
  const { t } = useTranslation();
  const [, setErrorMessage] = useErrorMessage();

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

  return (
    <Page>
      <div className={styles.protectedPage}>
        <PageHeader>
          <SpinnerButton displaySpinner={isLoggingOut} onClick={onLogout}>{`${t(
            texts.logout.title
          )} (${session.username})`}</SpinnerButton>
        </PageHeader>
        <div className={styles.header}>
          <SpinnerButton displaySpinner={isLoggingOut} onClick={onLogout}>{`${t(
            texts.logout.title
          )} (${session.username})`}</SpinnerButton>
        </div>
        <div>{props.children}</div>
      </div>
    </Page>
  );
};
