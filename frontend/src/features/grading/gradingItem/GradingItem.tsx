import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { BeltAndDate } from "../../beltAndDate/BeltAndDate";
import { useRenderGrade } from "../../hooks/useRenderGrade";
import { useRenderKickTechnique } from "../../hooks/useRenderKickTechnique";
import styles from "./GradingItem.module.scss";
import { IGradingItemProps } from "./IGradingItemProps";

export const GradingItem: React.FC<IGradingItemProps> = (props) => {
  const { t } = useTranslation();
  const renderGrade = useRenderGrade();
  const renderKickTechnique = useRenderKickTechnique();

  return (
    <div className={styles.gradingItem}>
      <div className={styles.header}>
          <BeltAndDate
            achievedAt={props.grading.achievedAt}
            grade={props.grading.grade}
          />
        <div className={styles.grade}>{renderGrade(props.grading.grade)}</div>
      </div>
      <div className={styles.details}>
        <div>{t(texts.gradingItem.kickTechnique)}</div>
        <div className={styles.detailValue}>
          {renderKickTechnique(props.grading.kickTechnique)}
        </div>
        <div>{t(texts.general.place)}</div>
        <div className={styles.detailValue}>{props.grading.place}</div>
        <div>{t(texts.gradingItem.examiners)}</div>
        <div className={styles.detailValue}>{props.grading.examiners}</div>
      </div>
    </div>
  );
};
