import { List } from "../../../core/services/list/List";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventDefinitionItem } from "../eventDefinitionItem/EventDefinitionItem";
import styles from "./EventDefinitionList.module.scss";
import { IEventDefinitionListProps } from "./IEventDefinitionListProps";

export const EventDefinitionList: React.FC<IEventDefinitionListProps> = (
  props
) => {
  const { t } = useTranslation();

  const items = props.events.map((event) => {
    return (
      <EventDefinitionItem
        key={event.id}
        event={event}
        onSelect={props.onSelect}
        renderEvent={props.renderEvent}
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
