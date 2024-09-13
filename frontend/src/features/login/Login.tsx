import { Card } from "../../components/card/Card";
import { LabeledInput } from "../../components/labeledInput/LabeledInput";
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
        <h3 className={styles.headline}>
          {viewModel.loginMode ? t(texts.login.title) : t(texts.login.register)}
        </h3>
        {viewModel.errorMessage && <Error message={viewModel.errorMessage} />}
        {viewModel.successMessage && (
          <Card className={styles.successMessage}>
            {viewModel.successMessage}
          </Card>
        )}
        <LabeledInput
          label={t(texts.general.username)}
          onChange={viewModel.setUsername}
          onEnter={viewModel.onEnter}
          value={viewModel.username}
        />
        <LabeledInput
          disabled={viewModel.disablePassword}
          label={t(texts.login.password)}
          onChange={viewModel.setPassword}
          onEnter={viewModel.onEnter}
          type="password"
          value={viewModel.password}
        />
        <button
          className={styles.register}
          onClick={viewModel.onToggleLoginMode}
        >
          {viewModel.loginMode
            ? t(texts.login.registerText)
            : t(texts.login.login)}
        </button>
        <div className={styles.footer}>
          <SpinnerButton
            disabled={viewModel.disableLoginButton}
            displaySpinner={viewModel.displaySpinner}
            onClick={viewModel.onConfirm}
          >
            {viewModel.loginMode
              ? t(texts.login.login)
              : t(texts.login.register)}
          </SpinnerButton>
        </div>
      </Card>
    </div>
  );
};
