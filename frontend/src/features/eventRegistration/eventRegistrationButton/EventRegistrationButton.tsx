import { SpinnerButton } from "../../../components/spinnerButton/SpinnerButton";
import { style } from "../../../core/ui/style";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { IEvent } from "../../eventCalendar/model/IEvent";
import styles from "./EventRegistrationButton.module.scss";
import { IEventRegistrationButtonProps } from "./IEventRegistrationButtonProps";
import { useEventRegistrationButtonViewModel } from "./useEventRegistrationButtonViewModel";

/**
 * This component is responsible for displaying a button to register on an event or to unregister from.
 * The button toggles and changes its color and handles the backend calls.
 */
export const EventRegistrationButton = <TEvent extends IEvent>(
  props: IEventRegistrationButtonProps<TEvent>
) => {
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
            viewModel.onUnregister(props.calendarEvent);
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
            viewModel.onRegister(props.calendarEvent);
            clickEvent.stopPropagation();
          }}
        >
          {t(texts.eventRegistrationButton.register)}
        </SpinnerButton>
      )}
    </>
  );
};
