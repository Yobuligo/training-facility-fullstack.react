import { isInitial } from "../../../core/utils/isInitial";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { EventInstanceItem } from "../eventInstanceItem/EventInstanceItem";
import styles from "./EventInstanceList.module.scss";
import { IEventInstanceListProps } from "./IEventInstanceListProps";

export const EventInstanceList: React.FC<IEventInstanceListProps> = (props) => {
  const { t } = useTranslation();

  const items = props.eventInstances.map((eventInstance) => (
    <EventInstanceItem key={eventInstance.id} eventInstance={eventInstance} />
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