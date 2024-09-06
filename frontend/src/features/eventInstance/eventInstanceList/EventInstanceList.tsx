import { isInitial } from "../../../core/utils/isInitial";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventInstanceItem } from "../eventInstanceItem/EventInstanceItem";
import styles from "./EventInstanceList.module.scss";
import { IEventInstanceListProps } from "./IEventInstanceListProps";

export const EventInstanceList: React.FC<IEventInstanceListProps> = (props) => {
  const { t } = useTranslation();

  const items = props.eventInstancesShort.map((eventInstance) => (
    <EventInstanceItem
      key={eventInstance.id}
      eventInstanceShort={eventInstance}
    />
  ));

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
