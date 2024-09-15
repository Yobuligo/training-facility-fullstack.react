import { Card } from "../../../components/card/Card";
import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
import { SecondaryButton } from "../../../components/secondaryButton/SecondaryButton";
import { SpinnerButton } from "../../../components/spinnerButton/SpinnerButton";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { Error } from "../../error/Error";
import { PasswordConfirmForm } from "../passwordConfirmForm/PasswordConfirmForm";
import styles from "./PasswordChange.module.scss";
import { usePasswordChangeViewModel } from "./usePasswordChangeViewModel";

export const PasswordChange: React.FC = () => {
  const viewModel = usePasswordChangeViewModel();
  const { t } = useTranslation();

  return (
    <div className={styles.passwordChange}>
      <Card className={styles.card}>
        <h3 className={styles.headline}>{t(texts.passwordChange.title)}</h3>
        {viewModel.changePasswordError && (
          <Error message={viewModel.changePasswordError} />
        )}
        <LabeledInput
          label={t(texts.passwordChange.currentPassword)}
          type="password"
          onChange={viewModel.setCurrentPassword}
        />
        <PasswordConfirmForm
          newConfirmPassword={viewModel.newConfirmPassword}
          newConfirmPasswordError={viewModel.newConfirmPasswordError}
          newPassword={viewModel.newPassword}
          setNewConfirmPassword={viewModel.setNewConfirmPassword}
          setNewConfirmPasswordError={viewModel.setNewConfirmPasswordError}
          setNewPassword={viewModel.setNewPassword}
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
            {t(texts.passwordChange.changePassword)}
          </SpinnerButton>
        </Toolbar>
      </Card>
    </div>
  );
};
