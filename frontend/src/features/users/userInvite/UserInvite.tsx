import { Card } from "../../../components/card/Card";
import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
import { PageSpinner } from "../../../components/pageSpinner/PageSpinner";
import { SpinnerButton } from "../../../components/spinnerButton/SpinnerButton";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { Error } from "../../error/Error";
import { IUserInviteProps } from "./IUserInviteProps";
import styles from "./UserInvite.module.scss";
import { useUserInviteViewModel } from "./useUserInviteViewModel";

export const UserInvite: React.FC<IUserInviteProps> = (props) => {
  const viewModel = useUserInviteViewModel();
  const { t } = useTranslation();

  return (
    <div>
      {viewModel.isVerifyUserInviteRequestProcessing ? (
        <PageSpinner />
      ) : (
        <div className={styles.userInvite}>
          <Card className={styles.card}>
            <h3 className={styles.headline}>{t(texts.changePassword.title)}</h3>
            {viewModel.error && <Error message={viewModel.error} />}
            {viewModel.userInvite?.username && (
              <LabeledInput
                disabled={true}
                label={t(texts.general.username)}
                value={viewModel.userInvite.username}
              />
            )}
            <LabeledInput
              label={t(texts.userInvite.newPassword)}
              type="password"
              onChange={viewModel.setNewPassword}
            />
            <LabeledInput
              label={t(texts.changePassword.confirmNewPassword)}
              type="password"
              onChange={viewModel.setNewConfirmPassword}
              error={viewModel.newConfirmPasswordError}
            />
            <Toolbar className={styles.toolbar}>
              <SpinnerButton
                disabled={viewModel.isConfirmButtonDisabled}
                displaySpinner={false}
                onClick={viewModel.onChangePasswordConfirm}
              >
                {t(texts.changePassword.changePassword)}
              </SpinnerButton>
            </Toolbar>
          </Card>
        </div>
      )}
    </div>
  );
};
