import { texts } from "../../../hooks/useTranslation/texts";
import { useTranslation } from "../../../hooks/useTranslation/useTranslation";
import { DateTime } from "../../../core/services/date/DateTime";
import { GradingItem } from "../gradingItem/GradingItem";
import styles from "./GradingList.module.scss";
import { IGradingListProps } from "./IGradingListProps";

export const GradingList: React.FC<IGradingListProps> = (props) => {
  const { t } = useTranslation();

  const items = props.gradings
    .sort((left, right) => DateTime.compare(right.achievedAt, left.achievedAt))
    .map((grading) => (
      <GradingItem
        key={grading.id}
        displayMode={props.displayMode}
        grading={grading}
        isAdminMode={props.isAdminMode}
        onDelete={() => props.onDelete?.(grading)}
      />
    ));

  return (
    <div className={styles.gradingList}>
      {items.length > 0 ? items : t(texts.gradingList.noGradingsAvailable)}
    </div>
  );
};
