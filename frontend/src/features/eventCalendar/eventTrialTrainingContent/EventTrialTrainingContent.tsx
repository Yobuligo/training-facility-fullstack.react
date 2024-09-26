import { SpinnerButton } from "../../../components/spinnerButton/SpinnerButton";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventContent } from "../eventContent/EventContent";
import styles from "./EventTrialTrainingContent.module.scss";
import { IEventTrialTrainingContentProps } from "./IEventTrialTrainingContentProps";

export const EventTrialTrainingContent: React.FC<
  IEventTrialTrainingContentProps
> = (props) => {
  const { t } = useTranslation();

  const onBook = () => props.onBook?.(props.eventDefinition);

  return (
    <EventContent
      className={styles.eventTrialTrainingContent}
      eventDefinition={props.eventDefinition}
    >
      <SpinnerButton
        className={styles.bookButton}
        displaySpinner={false}
        onClick={onBook}
      >
        {t(texts.trialTrainingContent.book)}
      </SpinnerButton>
    </EventContent>
  );
};
