import { CSSProperties } from "react";
import { IProgressChartProps } from "./IProgressChartProps";
import styles from "./ProgressChart.module.scss";

export const ProgressChart: React.FC<IProgressChartProps> = (props) => {
  const styling: CSSProperties = {
    "--fillColor": props.color,
  } as CSSProperties;

  return (
    <div className={styles.progressChart}>
      <div className={styles.titleContainer}>
        <div>{props.title}</div>
        {`${props.percent}%`}
      </div>
      <progress
        value={props.value}
        max={props.totalValue}
        className={styles.progress}
        style={styling}
      />
    </div>
  );
};
