import { CSSProperties } from "react";
import { IProgressChartProps } from "./IProgressChartProps";
import styles from "./ProgressChart.module.scss";

export const ProgressChart: React.FC<IProgressChartProps> = (props) => {
  const styling: CSSProperties = {
    "--fillColor": props.color,
  } as CSSProperties;

  return (
    <div className={styles.progressChart}>
      <div className={styles.title}>
        {props.title}
        {"  "}
        {`${Math.round((props.value *100 ) / props.totalValue)}%`}
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
