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

  const items = props.eventDefinitions.map((eventDefinition) => (
    <EventDefinitionItem
      key={eventDefinition.id}
      eventDefinition={eventDefinition}
    />
  ));

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
