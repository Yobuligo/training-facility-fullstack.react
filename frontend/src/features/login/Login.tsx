import { Card } from "../../components/card/Card";
import { LabeledInput } from "../../components/labeledInput/LabeledInput";
import { LabeledPasswordInput } from "../../components/labeledPasswordInput/LabeledPasswordInput";
import { SpinnerButton } from "../../components/spinnerButton/SpinnerButton";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { Error } from "../error/Error";
import styles from "./Login.module.scss";
import { useLoginViewModel } from "./useLoginViewModel";

export const Login: React.FC = () => {
  const viewModel = useLoginViewModel();
  const { t } = useTranslation();

  return (
    <div className={styles.login}>
      <Card className={styles.loginCard}>
        <h3 className={styles.headline}>{t(texts.login.title)}</h3>
        {viewModel.errorMessage && <Error message={viewModel.errorMessage} />}
        {viewModel.successMessage && (
          <Card className={styles.successMessage}>
            {viewModel.successMessage}
          </Card>
        )}
        <LabeledInput
          autoFocus
          label={t(texts.general.username)}
          onChange={viewModel.setUsername}
          onEnter={viewModel.onEnter}
          value={viewModel.username}
        />
        <LabeledPasswordInput
          disabled={viewModel.disablePassword}
          label={t(texts.login.password)}
          onChange={viewModel.setPassword}
          onEnter={viewModel.onEnter}
          value={viewModel.password}
        />
        <div className={styles.footer}>
          <SpinnerButton
            disabled={viewModel.disableLoginButton}
            displaySpinner={viewModel.displaySpinner}
            onClick={viewModel.onLogin}
          >
            {t(texts.login.login)}
          </SpinnerButton>
        </div>
      </Card>
    </div>
  );
};
