import { SpinnerButton } from "../../../components/spinnerButton/SpinnerButton";
import { style } from "../../../core/ui/style";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import styles from "./EventRegistrationButton.module.scss";
import { IEventRegistrationButtonProps } from "./IEventRegistrationButtonProps";
import { useEventRegistrationButtonViewModel } from "./useEventRegistrationButtonViewModel";

export const EventRegistrationButton: React.FC<
  IEventRegistrationButtonProps
> = (props) => {
  const viewModel = useEventRegistrationButtonViewModel(props);
  const { t } = useTranslation();

  return (
    <>
      {viewModel.confirmDialog.content}
      {props.isRegistered === true ? (
        <SpinnerButton
          className={style(styles.registerButton, styles.unregisterButton)}
          displaySpinner={viewModel.isUnregisterRequestProcessing}
          onClick={(clickEvent) => {
            viewModel.onUnregister(props.event);
            clickEvent.stopPropagation();
          }}
        >
          {t(texts.eventRegistrationButton.unregister)}
        </SpinnerButton>
      ) : (
        <SpinnerButton
          className={styles.registerButton}
          displaySpinner={viewModel.isRegisterRequestProcessing}
          onClick={(clickEvent) => {
            viewModel.onRegister(props.event);
            clickEvent.stopPropagation();
          }}
        >
          {t(texts.eventRegistrationButton.register)}
        </SpinnerButton>
      )}
    </>
  );
};
