import { isInitial } from "../../../core/utils/isInitial";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventInstanceItemAligned } from "../eventInstanceItemAligned/EventInstanceItemAligned";
import styles from "./EventInstanceList.module.scss";
import { IEventInstanceListProps } from "./IEventInstanceListProps";

export const EventInstanceList: React.FC<IEventInstanceListProps> = (props) => {
  const { t } = useTranslation();

  const items = props.eventInstanceItemModelAndRoles.map(
    (eventInstanceItemModel) => (
      <EventInstanceItemAligned
        key={eventInstanceItemModel.id}
        eventInstanceItemModel={eventInstanceItemModel}
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
    <div className={styles.eventInstanceList}>
      {isInitial(items) ? (
        <>{t(texts.eventInstanceList.noItems)}</>
      ) : (
        <>{items}</>
      )}
    </div>
  );
};
