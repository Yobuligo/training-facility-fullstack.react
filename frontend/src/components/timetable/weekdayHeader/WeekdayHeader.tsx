import { IWeekdayHeaderProps } from "./IWeekdayHeaderProps";
import styles from "./WeekdayHeader.module.scss";

export const WeekdayHeader: React.FC<IWeekdayHeaderProps> = (props) => {
  const lengthOfWeekdayBlockWithColor = props.blockColumnSpan + 1;

  const timelineColumn = 1;
  const weekdayGridColumn = (index: number) => {
    const from = index * props.blockColumnSpan + 1 + timelineColumn;
    const to =
      index * props.blockColumnSpan +
      lengthOfWeekdayBlockWithColor +
      timelineColumn;

    return `${from}/${to}`;
  };

  return (
    <div
      key={props.weekday}
      className={styles.weekdayHeader}
      style={{
        gridColumn: weekdayGridColumn(props.positionInGrid),
      }}
    >
      {props.weekday}
    </div>
  );
};
