import { Card } from "../../../components/card/Card";
import { LabeledInput } from "../../../components/labeledInput/LabeledInput";
import { DateTime } from "../../../core/services/date/DateTime";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { style } from "../../../utils/style";
import styles from "./EventInstanceItem.module.scss";
import { IEventInstanceItemProps } from "./IEventInstanceItemProps";

export const EventInstanceItem: React.FC<IEventInstanceItemProps> = (props) => {
  const { t } = useTranslation();

  return (
    <Card className={styles.eventInstanceItem}>
      <LabeledInput
        classNameInput={style(styles.input, styles.title)}
        label={t(texts.eventInstanceItem.title)}
        value={props.eventInstance.title}
      />
      <LabeledInput
        classNameInput={styles.input}
        label={t(texts.eventInstanceItem.date)}
        type="date"
        value={DateTime.toDate(props.eventInstance.from)}
      />
      <LabeledInput
        classNameInput={styles.input}
        label={t(texts.eventInstanceItem.startAtTime)}
        type="time"
        value={DateTime.toTime(props.eventInstance.from)}
      />
      <div className={styles.separator} />
      <LabeledInput
        classNameInput={styles.input}
        label={t(texts.eventInstanceItem.endAtTime)}
        type="time"
        value={DateTime.toTime(props.eventInstance.to)}
      />
    </Card>
  );
};
