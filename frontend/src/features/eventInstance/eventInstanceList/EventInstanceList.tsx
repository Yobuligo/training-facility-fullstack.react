import { CardList } from "../../../components/cardList/CardList";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventInstanceItemAligned } from "../eventInstanceItemAligned/EventInstanceItemAligned";
import { IEventInstanceListProps } from "./IEventInstanceListProps";

export const EventInstanceList: React.FC<IEventInstanceListProps> = (props) => {
  const { t } = useTranslation();

  const items = props.eventInstanceItemModelAndRoles.map(
    (eventInstanceItemModel) => (
      <EventInstanceItemAligned
        key={eventInstanceItemModel.id}
        eventInstanceItemModel={eventInstanceItemModel}
        displayCursor={props.displayCursor}
        renderChildrenInline={true}
        onClick={() => {
          props.onClick?.(eventInstanceItemModel);
        }}
      >
        {props.renderChild && props.renderChild(eventInstanceItemModel)}
      </EventInstanceItemAligned>
    )
  );

  return (
    <CardList noEntriesFoundText={t(texts.eventInstanceList.noItems)}>
      {items}
    </CardList>
  );
};
