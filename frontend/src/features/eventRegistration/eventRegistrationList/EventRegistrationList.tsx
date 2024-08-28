import { List } from "../../../core/services/list/List";
import { texts } from "../../../lib/useTranslation/texts";
import { useTranslation } from "../../../lib/useTranslation/useTranslation";
import { EventRegistrationItem } from "../eventRegistrationItem/EventRegistrationItem";
import styles from "./EventRegistrationList.module.scss";
import { IEventRegistrationListProps } from "./IEventRegistrationListProps";

export const EventRegistrationList: React.FC<IEventRegistrationListProps> = (
  props
) => {
  const { t } = useTranslation();

  const items = props.eventRegistrations.map((eventRegistration) => (
    <EventRegistrationItem
      key={eventRegistration.id}
      eventRegistration={eventRegistration}
      onDelete={props.onDelete}
    />
  ));

  return (
    <div className={styles.eventRegistrationList}>
      {List.isEmpty(items) ? (
        <>{t(texts.eventRegistrationList.noRegistrations)}</>
      ) : (
        <>{items}</>
      )}
    </div>
  );
};
