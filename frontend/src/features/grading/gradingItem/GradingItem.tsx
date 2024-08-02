import { useRenderMonth } from "../../../hooks/useRenderMonth";
import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { DeleteIcon } from "../../../icons/DeleteIcon";
import { DateTime } from "../../../services/date/DateTime";
import { Grade } from "../../../shared/types/Grade";
import componentStyles from "../../../styles/components.module.scss";
import { style } from "../../../utils/style";
import styles from "./GradingItem.module.scss";
import { IGradingItemProps } from "./IGradingItemProps";

export const GradingItem: React.FC<IGradingItemProps> = (props) => {
  const { t } = useTranslation();
  const renderMonth = useRenderMonth();

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

  const gradeToClassName = (grade: Grade) => {
    switch (grade) {
      case Grade.KUP9:
        return componentStyles.kup9;
      case Grade.KUP8:
        return componentStyles.kup8;
      case Grade.KUP7:
        return componentStyles.kup7;
      case Grade.KUP6:
        return componentStyles.kup6;
      case Grade.KUP5:
        return componentStyles.kup5;
      case Grade.KUP4:
        return componentStyles.kup4;
      case Grade.KUP3:
        return componentStyles.kup3;
      case Grade.KUP2:
        return componentStyles.kup2;
      case Grade.KUP1:
        return componentStyles.kup1;
      case Grade.DAN1:
        return componentStyles.dan;
      case Grade.DAN2:
        return componentStyles.dan;
      case Grade.DAN3:
        return componentStyles.dan;
      case Grade.DAN4:
        return componentStyles.dan;
      case Grade.DAN5:
        return componentStyles.dan;
      case Grade.DAN6:
        return componentStyles.dan;
      case Grade.DAN7:
        return componentStyles.dan;
    }
  };

  return (
    <div className={styles.gradingItem}>
      <div className={styles.card}>
        <div
          className={style(styles.date, gradeToClassName(props.grading.grade))}
        >
          <div className={styles.year}>
            {DateTime.toYear(props.grading.achievedAt)}
          </div>
          <div>
            {renderMonth(parseInt(DateTime.toMonth(props.grading.achievedAt)))}
          </div>
          <div>{DateTime.toDay(props.grading.achievedAt)}</div>
        </div>
        <div className={styles.details}>
          <div className={styles.title}>{gradeToText(props.grading.grade)}</div>
          <div className={styles.achievedAt}>{`${t(
            texts.gradingItem.achievedAt
          )} ${DateTime.formatDate(props.grading.achievedAt)}`}</div>
        </div>
      </div>
      {props.isAdminMode && (
        <div className={styles.deleteIcon}>
          <DeleteIcon onClick={props.onDelete} />
        </div>
      )}
    </div>
  );
};
