import { List } from "../../../core/services/list/List";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventRegistrationItemUser } from "../eventRegistrationItemUser/EventRegistrationItemUser";
import { EventRegistrationItemTrialTraining } from "../eventRegistrationItemTrialTraining/EventRegistrationItemTrialTraining";
import styles from "./EventRegistrationList.module.scss";
import { IEventRegistrationListProps } from "./IEventRegistrationListProps";

export const EventRegistrationList: React.FC<IEventRegistrationListProps> = (
  props
) => {
  const { t } = useTranslation();

  const eventRegistrationItems = props.eventRegistrations.map(
    (eventRegistration) => (
      <EventRegistrationItemUser
        key={eventRegistration.id}
        eventRegistration={eventRegistration}
        onDelete={props.onDelete}
      />
    )
  );

  const userTrialTrainingItems = props.userTrialTrainings.map(
    (userTrialTraining) => (
      <EventRegistrationItemTrialTraining
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
