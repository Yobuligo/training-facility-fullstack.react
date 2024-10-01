import { List } from "../../../core/services/list/List";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventInfo } from "../../../services/EventInfo";
import { EventDefinitionItem } from "../eventDefinitionItem/EventDefinitionItem";
import styles from "./EventDefinitionList.module.scss";
import { IEventDefinitionListProps } from "./IEventDefinitionListProps";

export const EventDefinitionList: React.FC<IEventDefinitionListProps> = (
  props
) => {
  const { t } = useTranslation();

  const items = props.events.map((event) => {
    const eventRegistration = EventInfo.findFirstEventRegistrationByUserId(
      event,
      props.userId
    );
    return (
      <EventDefinitionItem
        key={event.eventDefinition.id}
        event={event}
        isRegistered={eventRegistration !== undefined}
        userId={props.userId}
      />
    );
  });

  return (
    <div className={styles.eventDefinitionList}>
      {List.isEmpty(items) ? (
        <>{t(texts.eventDefinitionList.noItems)}</>
      ) : (
        <>{items}</>
      )}
    </div>
  );
};
