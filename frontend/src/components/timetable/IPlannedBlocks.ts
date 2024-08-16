import { Weekday } from "./Weekday";

export interface IPlannedBlock {
  title: string;
  description?: string;
  color: string;
  weekdayIndex: Weekday;
  startTime: Date;
  endTime: Date;
}
