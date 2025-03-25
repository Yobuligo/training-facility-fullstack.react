import { Card } from "../../../components/card/Card";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventRegistrationCheckInButtons } from "../eventRegistrationCheckInButtons/EventRegistrationCheckInButtons";
import { EventRegistrationItemBase } from "../eventRegistrationItemBase/EventRegistrationItemBase";
import styles from "./EventRegistrationTrialTrainingItem.module.scss";
import { IEventRegistrationTrialTrainingItemProps } from "./IEventRegistrationTrialTrainingItemProps";
import { useEventRegistrationTrialTrainingItemViewModel } from "./useEventRegistrationTrialTrainingItemViewModel";

export const EventRegistrationTrialTrainingItem: React.FC<
  IEventRegistrationTrialTrainingItemProps
> = (props) => {
  const { t } = useTranslation();
  const viewModel = useEventRegistrationTrialTrainingItemViewModel(props);

  return (
    <Card className={styles.eventRegistrationTrialTrainingItem}>
      <EventRegistrationItemBase
        text={t(texts.eventRegistrationItem.addedByTrialTraining)}
        userProfile={viewModel.userProfileDummy}
      >
        <EventRegistrationCheckInButtons
          eventRegistrationState={props.userTrialTraining.state}
          onEventRegistrationStateChange={viewModel.updateEventState}
        />
      </EventRegistrationItemBase>
    </Card>
  );
};
