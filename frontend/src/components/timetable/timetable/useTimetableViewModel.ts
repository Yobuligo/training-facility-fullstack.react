import { Weekday } from "../../../core/types/Weekday";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import global from "../../../styles/global.module.scss";
import { IBlock } from "../block/IBlock";
import { IPlannedBlock } from "../IPlannedBlocks";
import { PlannedBlockAnalyzer } from "../services/PlannedBlockAnalyzer";
import { TimeConverter } from "../services/TimeConverter";
import { Time } from "../types/Time";
import { ITimetableProps } from "./ITimetableProps";

export const useTimeTableViewModel = (props: ITimetableProps) => {
  const { width } = useWindowDimensions();

  const isSmallScreen = width <= +global.mediumScreenWidth;
  const plannedWeekdays = PlannedBlockAnalyzer.getPlannedWeekdays(
    props.plannedBlocks
  );

  const xPositionOfDayInTimetable = (weekday: Weekday) =>
    plannedWeekdays.findIndex((item) => item === weekday) + 1;

  const timeIntervals: Time[] = PlannedBlockAnalyzer.getTimeIntervals(
    props.plannedBlocks,
    props.timelineIntervalInMinutes
  );
  const timeline: string[] = timeIntervals.map((time) =>
    TimeConverter.getTimeAsString(time)
  );

  const getAllBlocks = (): IBlock[] => {
    return props.plannedBlocks.map((plannedBlock) =>
      block(plannedBlock, xPositionOfDayInTimetable)
    );
  };

  const block = (
    plannedBlock: IPlannedBlock,
    xPositionOfDayInTimetable: (weekday: Weekday) => number
  ): IBlock => {
    return {
      id: plannedBlock.id,
      title: plannedBlock.title,
      description: plannedBlock.description,
      color: plannedBlock.color,
      startTime: TimeConverter.getDateTimeAsString(plannedBlock.startTime),
      endTime: TimeConverter.getDateTimeAsString(plannedBlock.endTime),
      xPositionOfDayInTimetable: xPositionOfDayInTimetable(
        plannedBlock.weekday
      ),
      startTimeIntervalIndex: PlannedBlockAnalyzer.findPositionInInterval(
        timeIntervals,
        plannedBlock.startTime
      ),
      endTimeIntervalIndex: PlannedBlockAnalyzer.findPositionInInterval(
        timeIntervals,
        plannedBlock.endTime
      ),
    };
  };

  const allBlocks: IBlock[] = getAllBlocks();
  const blocksByWeekday = (weekday: Weekday) => {
    const plannedBlocks = props.plannedBlocks.filter(
      (plannedBlock) =>
        plannedBlock.weekday ===
        Object.values(Weekday).findIndex((item) => item === weekday)
    );
    return plannedBlocks.map((plannedBlock) => block(plannedBlock, () => 2));
  };

  return {
    allBlocks,
    blocksByWeekday,
    plannedWeekdays,
    timeline,
    isSmallScreen,
  };
};
