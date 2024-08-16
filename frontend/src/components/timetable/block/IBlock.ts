export interface IBlock {
  id: string;
  color: string;
  description?: string;
  endTime: string;
  endTimeIntervalIndex: number;
  startTime: string;
  startTimeIntervalIndex: number;
  title: string;
  xPositionOfDayInTimetable: number;
}
