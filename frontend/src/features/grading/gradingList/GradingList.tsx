import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { DateTime } from "../../../core/services/date/DateTime";
import { GradingItem } from "../gradingItem/GradingItem";
import styles from "./GradingList.module.scss";
import { IGradingListProps } from "./IGradingListProps";
import { style } from "../../../core/ui/style";

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
    <div className={style(styles.gradingList, props.className)}>
      {items.length > 0 ? items : t(texts.gradingList.noGradingsAvailable)}
    </div>
  );
};
