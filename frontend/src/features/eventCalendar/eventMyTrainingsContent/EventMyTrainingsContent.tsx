import { SpinnerButton } from "../../../components/spinnerButton/SpinnerButton";
import { style } from "../../../core/ui/style";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventContent } from "../eventContent/EventContent";
import styles from "./EventMyTrainingsContent.module.scss";
import { IEventMyTrainingsContentProps } from "./IEventMyTrainingsContentProps";
import { useEventMyTrainingsContentViewModel } from "./useEventMyTrainingsContentViewModel";

export const EventMyTrainingsContent: React.FC<
  IEventMyTrainingsContentProps
> = (props) => {
  const { t } = useTranslation();
  const viewModel = useEventMyTrainingsContentViewModel(props);

  return (
    <EventContent
      className={styles.eventMyTrainingsContent}
      eventDefinition={props.event.eventDefinition}
    >
      {props.isRegistered === true ? (
        <SpinnerButton
          className={style(styles.registerButton, styles.unregisterButton)}
          displaySpinner={viewModel.isUnregisterRequestProcessing}
          onClick={(clickEvent) => {
            viewModel.onUnregister(props.event);
            clickEvent.stopPropagation();
          }}
        >
          {t(texts.myTrainings.unregister)}
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
          {t(texts.myTrainings.register)}
        </SpinnerButton>
      )}
    </EventContent>
  );
};
