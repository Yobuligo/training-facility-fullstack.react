import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { EventContent } from "../eventContent/EventContent";
import styles from "./EventCalledOff.module.scss";

export const EventCalledOff: React.FC = () => {
  const { t } = useTranslation();
  return (
    <EventContent className={styles.eventCalledOff}>
      {t(texts.eventCalledOff.calledOff)}
    </EventContent>
  );
};
