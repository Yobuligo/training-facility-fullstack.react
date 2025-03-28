import { CardList } from "../../../components/cardList/CardList";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventDefinitionItem } from "../eventDefinitionItem/EventDefinitionItem";
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
    <CardList noEntriesFoundText={t(texts.eventDefinitionList.noItems)}>
      {items}
    </CardList>
  );
};
