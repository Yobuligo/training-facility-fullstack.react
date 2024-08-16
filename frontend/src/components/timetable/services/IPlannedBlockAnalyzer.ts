import { IPlannedBlock } from "../IPlannedBlocks";
import { Time } from "../types/Time";
import { Weekday } from "../Weekday";

export interface IPlannedBlockAnalyzer {
  findPositionInInterval(timeIntervals: Time[], date: Date): number;
  getPlannedWeekdays(plannedBlocks: IPlannedBlock[]): Weekday[];
  getTimeIntervals(
    plannedBlocks: IPlannedBlock[],
    timelineIntervalInMinutes: number
  ): Time[];
}
