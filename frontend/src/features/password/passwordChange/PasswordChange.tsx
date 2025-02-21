import { Card } from "../../../components/card/Card";
import { LabeledPasswordInput } from "../../../components/labeledPasswordInput/LabeledPasswordInput";
import { SecondaryButton } from "../../../components/secondaryButton/SecondaryButton";
import { SpinnerButton } from "../../../components/spinnerButton/SpinnerButton";
import { Toolbar } from "../../../components/toolbar/Toolbar";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { Error } from "../../error/Error";
import { PasswordConfirmForm } from "../passwordConfirmForm/PasswordConfirmForm";
import styles from "./PasswordChange.module.scss";
import { usePasswordChangeViewModel } from "./usePasswordChangeViewModel";

const PasswordChange: React.FC = () => {
  const viewModel = usePasswordChangeViewModel();
  const { t } = useTranslation();

  return (
    <div className={styles.passwordChange}>
      <Card className={styles.card}>
        <h3 className={styles.headline}>{t(texts.passwordChange.title)}</h3>
        {viewModel.changePasswordError && (
          <Error message={viewModel.changePasswordError} />
        )}
        <LabeledPasswordInput
          autoFocus
          label={t(texts.passwordChange.currentPassword)}
          onChange={viewModel.setCurrentPassword}
        />
        <PasswordConfirmForm
          newConfirmPassword={viewModel.newConfirmPassword}
          newPassword={viewModel.newPassword}
          passwordRequirements={viewModel.passwordRequirements}
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

export default PasswordChange;
