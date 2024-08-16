import { ReactElement } from "react";
import { Block } from "../block/Block";
import { IBlock } from "../block/IBlock";
import { Weekday } from "../Weekday";
import { WeekdayHeader } from "../weekdayHeader/WeekdayHeader";
import { ITimetableProps } from "./ITimetableProps";
import styles from "./Timetable.module.scss";
import { useTimeTableViewModel } from "./useTimetableViewModel";

export const Timetable: React.FC<ITimetableProps> = (props) => {
  const viewModel = useTimeTableViewModel(props);

  //the number of grid cells(rows) before the actual block starts
  const blockStartRowOffset = 2;
  //the number of grid cells a block occupies
  const blockColumnSpan = 2;
  const timetableGridTemplateColumns = `${
    viewModel.isSmallScreen
      ? "15% 3% auto"
      : `5% ${viewModel.plannedWeekdays.map((_) => "1% auto").join(" ")}`
  }`;

  const timeline = (): ReactElement | ReactElement[] => {
    return viewModel.timeline.map((time, index) => (
      <div
        key={`${index}_${time}`}
        className={styles.timeline}
        style={{ gridRowStart: index + 2 }}
      >
        {time}
      </div>
    ));
  };

  const weekdays = (): ReactElement | ReactElement[] =>
    viewModel.plannedWeekdays.map((weekday, index) => (
      <WeekdayHeader
        blockColumnSpan={blockColumnSpan}
        positionInGrid={index}
        weekday={weekday}
      />
    ));

  const weekday = (weekday: string): ReactElement => (
    <WeekdayHeader
      blockColumnSpan={blockColumnSpan}
      positionInGrid={viewModel.isSmallScreen ? 0 : 1}
      weekday={weekday}
    />
  );

  const allBlocks = (): ReactElement | ReactElement[] => {
    return viewModel.allBlocks.map((block) => buildBlock(block));
  };

  const blocksByWeekday = (weekday: Weekday): ReactElement | ReactElement[] => {
    return viewModel.blocksByWeekday(weekday).map((block) => buildBlock(block));
  };

  const buildBlock = (block: IBlock): ReactElement => (
    <Block
      color={block.color}
      startTime={block.startTime}
      endTime={block.endTime}
      gridColumnStart={
        viewModel.isSmallScreen
          ? block.xPositionOfDayInTimetable
          : block.xPositionOfDayInTimetable * blockColumnSpan
      }
      gridRowStart={block.startTimeIntervalIndex + blockStartRowOffset}
      gridRowEnd={block.endTimeIntervalIndex + blockStartRowOffset}
      title={block.title}
      description={block.description}
    />
  );

  return (
    <>
      {!viewModel.isSmallScreen && (
        <div
          className={styles.timetable}
          style={{ gridTemplateColumns: timetableGridTemplateColumns }}
        >
          <div className={styles.leftTop}></div>
          {timeline()}
          {weekdays()}
          {allBlocks()}
        </div>
      )}
      {viewModel.isSmallScreen && (
        <div className={styles.singleTimetables}>
          {viewModel.plannedWeekdays.map((plannedWeekday) => (
            <div
              className={styles.timetable}
              style={{ gridTemplateColumns: timetableGridTemplateColumns }}
            >
              <div className={styles.leftTop}></div>
              {timeline()}
              {weekday(plannedWeekday)}
              {blocksByWeekday(plannedWeekday as any as Weekday)}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
