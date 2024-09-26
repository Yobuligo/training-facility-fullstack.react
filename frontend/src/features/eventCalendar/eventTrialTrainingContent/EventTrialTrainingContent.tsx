import { SpinnerButton } from "../../../components/spinnerButton/SpinnerButton";
import { DateTime } from "../../../core/services/date/DateTime";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventContent } from "../eventContent/EventContent";
import styles from "./EventTrialTrainingContent.module.scss";
import { IEventTrialTrainingContentProps } from "./IEventTrialTrainingContentProps";

export const EventTrialTrainingContent: React.FC<
  IEventTrialTrainingContentProps
> = (props) => {
  const { t } = useTranslation();

  const onBook = () => props.onBook?.(props.event);

  return (
    <EventContent
      className={styles.eventTrialTrainingContent}
      eventDefinition={props.event.eventDefinition}
    >
      {props.event.start && DateTime.isAfter(props.event.start) && (
        <SpinnerButton
          className={styles.bookButton}
          displaySpinner={false}
          onClick={onBook}
        >
          {t(texts.trialTrainingContent.book)}
        </SpinnerButton>
      )}
    </EventContent>
  );
};
