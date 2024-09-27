import { List } from "../../../core/services/list/List";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventRegistrationItem } from "../eventRegistrationItem/EventRegistrationItem";
import { EventRegistrationTrialTrainingItem } from "../eventRegistrationTrialTrainingItem/EventRegistrationTrialTrainingItem";
import styles from "./EventRegistrationList.module.scss";
import { IEventRegistrationListProps } from "./IEventRegistrationListProps";

export const EventRegistrationList: React.FC<IEventRegistrationListProps> = (
  props
) => {
  const { t } = useTranslation();

  const eventRegistrationItems = props.eventRegistrations.map(
    (eventRegistration) => (
      <EventRegistrationItem
        key={eventRegistration.id}
        eventRegistration={eventRegistration}
        onDelete={props.onDelete}
      />
    )
  );

  const userTrialTrainingItems = props.userTrialTrainings.map(
    (userTrialTraining) => (
      <EventRegistrationTrialTrainingItem
        key={userTrialTraining.id}
        userTrialTraining={userTrialTraining}
      />
    )
  );

  return (
    <div className={styles.eventRegistrationList}>
      {List.isEmpty(eventRegistrationItems) &&
      List.isEmpty(userTrialTrainingItems) ? (
        <>{t(texts.eventRegistrationList.noRegistrations)}</>
      ) : (
        <>
          <>{userTrialTrainingItems}</>
          <>{eventRegistrationItems}</>
        </>
      )}
    </div>
  );
};
