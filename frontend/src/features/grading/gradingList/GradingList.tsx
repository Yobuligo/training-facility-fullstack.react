import { DateTime } from "../../../services/date/DateTime";
import { GradingItem } from "../gradingItem/GradingItem";
import styles from "./GradingList.module.scss";
import { IGradingListProps } from "./IGradingListProps";

export const GradingList: React.FC<IGradingListProps> = (props) => {
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

  return <div className={styles.gradingList}>{items}</div>;
};
