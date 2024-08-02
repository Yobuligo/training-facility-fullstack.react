import { GradingItem } from "../gradingItem/GradingItem";
import styles from "./GradingList.module.scss";
import { IGradingListProps } from "./IGradingListProps";

export const GradingList: React.FC<IGradingListProps> = (props) => {
  const items = props.gradings.map((grading) => (
    <GradingItem key={grading.id} grading={grading} />
  ));

  return <div className={styles.gradingList}>{items}</div>;
};
