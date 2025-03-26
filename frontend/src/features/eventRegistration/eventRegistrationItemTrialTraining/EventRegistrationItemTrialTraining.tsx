import { Card } from "../../../components/card/Card";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventRegistrationCheckInButtons } from "../eventRegistrationCheckInButtons/EventRegistrationCheckInButtons";
import { EventRegistrationItem } from "../eventRegistrationItem/EventRegistrationItem";
import styles from "./EventRegistrationItemTrialTraining.module.scss";
import { IEventRegistrationItemTrialTrainingProps } from "./IEventRegistrationItemTrialTrainingProps";
import { useEventRegistrationItemTrialTrainingViewModel } from "./useEventRegistrationItemTrialTrainingViewModel";

/**
 * This component is responsible for displaying an event registration item for a trial training.
 */
export const EventRegistrationItemTrialTraining: React.FC<
  IEventRegistrationItemTrialTrainingProps
> = (props) => {
  const { t } = useTranslation();
  const viewModel = useEventRegistrationItemTrialTrainingViewModel(props);

  return (
    <Card className={styles.eventRegistrationItemTrialTraining}>
      <EventRegistrationItem
        text={t(texts.eventRegistrationItem.addedByTrialTraining)}
        userProfile={viewModel.userProfileDummy}
      >
        <EventRegistrationCheckInButtons
          eventRegistrationState={props.userTrialTraining.state}
          onEventRegistrationStateChange={viewModel.updateEventState}
        />
      </EventRegistrationItem>
    </Card>
  );
};
