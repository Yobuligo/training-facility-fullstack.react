import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { DateTime } from "../../../services/date/DateTime";
import { Grade } from "../../../shared/types/Grade";
import styles from "./GradingItem.module.scss";
import { IGradingItemProps } from "./IGradingItemProps";

export const GradingItem: React.FC<IGradingItemProps> = (props) => {
  const { t } = useTranslation();

  const gradeToText = (grade: Grade) => {
    switch (grade) {
      case Grade.KUP9:
        return t(texts.gradingItem.kup9);
      case Grade.KUP8:
        return t(texts.gradingItem.kup8);
      case Grade.KUP7:
        return t(texts.gradingItem.kup7);
      case Grade.KUP6:
        return t(texts.gradingItem.kup6);
      case Grade.KUP5:
        return t(texts.gradingItem.kup5);
      case Grade.KUP4:
        return t(texts.gradingItem.kup4);
      case Grade.KUP3:
        return t(texts.gradingItem.kup3);
      case Grade.KUP2:
        return t(texts.gradingItem.kup2);
      case Grade.KUP1:
        return t(texts.gradingItem.kup1);
      case Grade.DAN1:
        return t(texts.gradingItem.dan1);
      case Grade.DAN2:
        return t(texts.gradingItem.dan2);
      case Grade.DAN3:
        return t(texts.gradingItem.dan3);
      case Grade.DAN4:
        return t(texts.gradingItem.dan4);
      case Grade.DAN5:
        return t(texts.gradingItem.dan5);
      case Grade.DAN6:
        return t(texts.gradingItem.dan6);
      case Grade.DAN7:
        return t(texts.gradingItem.dan7);
    }
  };

  return (
    <div className={styles.gradingItem}>
      <div className={styles.logo}></div>
      <div className={styles.details}>
        <div>{gradeToText(props.grading.grade)}</div>
        <div>{`${t(texts.gradingItem.achievedAt)} ${DateTime.formatDate(
          props.grading.achievedAt
        )}`}</div>
      </div>
    </div>
  );
};
