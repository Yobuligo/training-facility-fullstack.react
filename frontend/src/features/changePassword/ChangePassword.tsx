import { Card } from "../../components/card/Card";
import { LabeledInput } from "../../components/labeledInput/LabeledInput";
import { SpinnerButton } from "../../components/spinnerButton/SpinnerButton";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { IChangePasswordProps } from "./IChangePasswordProps";
import styles from "./ChangePassword.module.scss";
import { useChangePasswordViewModel } from "./useChangePasswordViewModel";
import { Error } from "../error/Error";
import { SecondaryButton } from "../../components/secondaryButton/SecondaryButton";
import { Toolbar } from "../../components/toolbar/Toolbar";

export const ChangePassword: React.FC<IChangePasswordProps> = (props) => {
  const viewModel = useChangePasswordViewModel(props);
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
