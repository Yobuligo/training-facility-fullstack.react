import { Card } from "../../components/card/Card";
import { LabeledInput } from "../../components/labeledInput/LabeledInput";
import { SecondaryButton } from "../../components/secondaryButton/SecondaryButton";
import { SpinnerButton } from "../../components/spinnerButton/SpinnerButton";
import { Toolbar } from "../../components/toolbar/Toolbar";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { Error } from "../error/Error";
import styles from "./ChangePassword.module.scss";
import { useChangePasswordViewModel } from "./useChangePasswordViewModel";

export const ChangePassword: React.FC = () => {
  const viewModel = useChangePasswordViewModel();
  const { t } = useTranslation();

  return (
    <div className={styles.changePassword}>
      <Card className={styles.card}>
        <h3 className={styles.headline}>{t(texts.changePassword.title)}</h3>
        {viewModel.changePasswordError && (
          <Error message={viewModel.changePasswordError} />
        )}
        <LabeledInput
          label={t(texts.changePassword.currentPassword)}
          type="password"
          onChange={viewModel.onCurrentPassword}
        />
        <LabeledInput
          label={t(texts.changePassword.newPassword)}
          type="password"
          onChange={viewModel.onNewPassword}
        />
        <LabeledInput
          label={t(texts.changePassword.confirmNewPassword)}
          type="password"
          onChange={viewModel.onNewConfirmPassword}
          error={
            viewModel.showNewConfirmPasswordError
              ? t(texts.changePassword.passwordsNotIdentical)
              : undefined
          }
        />
        <Toolbar className={styles.toolbar}>
          <SecondaryButton onClick={viewModel.onCancel}>
            {t(texts.general.cancel)}
          </SecondaryButton>
          <SpinnerButton
            disabled={viewModel.confirmButtonDisabled}
            displaySpinner={viewModel.displaySpinner}
            onClick={viewModel.onChangePasswordConfirm}
          >
            {t(texts.changePassword.changePassword)}
          </SpinnerButton>
        </Toolbar>
      </Card>
    </div>
  );
};
