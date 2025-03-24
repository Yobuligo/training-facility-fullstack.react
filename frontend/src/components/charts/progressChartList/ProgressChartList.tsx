import { ProgressChart } from "../../../components/charts/progressChart/ProgressChart";
import { IProgressChartListProps } from "./IProgressChartListProps";
import styles from "./ProgressChartList.module.scss";

/**
 * This component is responsible for displaying certain progress chart entries as {@link ProgressChart}s in a list.
 */
export const ProgressChartList: React.FC<IProgressChartListProps> = (props) => {
  const progressChartEntries = props.progressChartEntries.map(
    (progressChartEntry, index) => (
      <ProgressChart
        key={index}
        color={progressChartEntry.color}
        percent={progressChartEntry.percent}
        title={progressChartEntry.title}
        totalValue={props.totalValue}
        value={progressChartEntry.value}
      />
    )
  );

  return <div className={styles.progressChartList}>{progressChartEntries}</div>;
};
