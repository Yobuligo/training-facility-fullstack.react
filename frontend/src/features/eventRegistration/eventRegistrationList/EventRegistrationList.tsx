import { List } from "../../../core/services/list/List";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
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