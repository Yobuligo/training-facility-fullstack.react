import { Card } from "../../components/card/Card";
import { LabeledInput } from "../../components/labeledInput/LabeledInput";
import { SpinnerButton } from "../../components/spinnerButton/SpinnerButton";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { INewPasswordProps } from "./INewPasswordProps";
import styles from "./NewPassword.module.scss";
import { useNewPasswordViewModel } from "./useNewPasswordViewModel";
import { Error } from "../error/Error";
import { SecondaryButton } from "../../components/secondaryButton/SecondaryButton";
import { Toolbar } from "../../components/toolbar/Toolbar";

export const NewPassword: React.FC<INewPasswordProps> = (props) => {
  const viewModel = useNewPasswordViewModel(props);
  const { t } = useTranslation();

  return (
    <div className={styles.passwordReset}>
      <Card className={styles.card}>
        <h3 className={styles.headline}>{t(texts.newPassword.title)}</h3>
        {viewModel.changePasswordError && (
          <Error message={viewModel.changePasswordError} />
        )}
        <LabeledInput
          label={t(texts.newPassword.currentPassword)}
          type="password"
          onChange={viewModel.onCurrentPassword}
        />
        <LabeledInput
          label={t(texts.newPassword.newPassword)}
          type="password"
          onChange={viewModel.onNewPassword}
        />
        <LabeledInput
          label={t(texts.newPassword.confirmNewPassword)}
          type="password"
          onChange={viewModel.onNewConfirmPassword}
          error={
            viewModel.showNewConfirmPasswordError
              ? t(texts.newPassword.passwordsNotIdentical)
              : undefined
          }
        />
        <Toolbar className={styles.toolbar}>
          <SecondaryButton>Cancel</SecondaryButton>
          <SpinnerButton
            disabled={viewModel.confirmButtonDisabled}
            displaySpinner={viewModel.displaySpinner}
            onClick={viewModel.onChangePasswordConfirm}
          >
            {t(texts.newPassword.changePassword)}
          </SpinnerButton>
        </Toolbar>
      </Card>
    </div>
  );
};
