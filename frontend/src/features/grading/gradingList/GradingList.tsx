import { DateTime } from "../../../core/services/date/DateTime";
import { style } from "../../../core/ui/style";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { GradingItem } from "../gradingItem/GradingItem";
import styles from "./GradingList.module.scss";
import { IGradingListProps } from "./IGradingListProps";

export const GradingList: React.FC<IGradingListProps> = (props) => {
  const { t } = useTranslation();

  const items = props.gradings
    .sort((left, right) => DateTime.compare(right.achievedAt, left.achievedAt))
    .map((grading) => <GradingItem key={grading.id} grading={grading} />);

  return (
    <div className={style(styles.gradingList, props.className)}>
      {items.length > 0 ? items : t(texts.gradingList.noGradingsAvailable)}
    </div>
  );
};
