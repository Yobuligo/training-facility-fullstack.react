import { useNavigate } from "react-router-dom";
import { isError } from "../../../core/utils/isError";
import { useUserLoader } from "../../../hooks/useUserLoader";
import { useToast } from "../../../lib/toast/hooks/useToast";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { useLogout } from "../../../lib/userSession/hooks/useLogout";
import componentStyles from "../../../styles/components.module.scss";
import { PageSpinner } from "../../pageSpinner/PageSpinner";
import { SpinnerButton } from "../../spinnerButton/SpinnerButton";
import { Page } from "../page/Page";
import { PageFooter } from "../pageFooter/PageFooter";
import { PageHeader } from "../pageHeader/PageHeader";
import { IProtectedPageProps } from "./IProtectedPageProps";
import styles from "./ProtectedPage.module.scss";
import { AppRoutes } from "../../../routes/AppRoutes";

export const ProtectedPage: React.FC<IProtectedPageProps> = (props) => {
  const { logout, isLoggingOut } = useLogout();
  const { t } = useTranslation();
  const userLoader = useUserLoader();
  const toast = useToast();
  const navigate = useNavigate();

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
  const onAppLogoClick = () =>
    props.onAppLogoClick
      ? props.onAppLogoClick()
      : navigate(AppRoutes.dashboard.toPath());

  return (
    <Page className={componentStyles.page}>
      <PageHeader onAppLogoClick={onAppLogoClick}>
        {!displaySpinner && (
          <SpinnerButton displaySpinner={isLoggingOut} onClick={onLogout}>{`${t(
            texts.logout.title
          )} (${userLoader.user?.userProfile.firstname})`}</SpinnerButton>
        )}
      </PageHeader>
      {displaySpinner ? (
        <div className={styles.spinner}>
          <PageSpinner />
        </div>
      ) : (
        <div>{props.children}</div>
      )}
      <PageFooter />
    </Page>
  );
};
