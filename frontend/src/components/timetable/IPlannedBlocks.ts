import { Weekday } from "../../core/types/Weekday";

export interface IPlannedBlock {
  id: string;
  color: string;
  description?: string;
  endTime: Date;
  title: string;
  startTime: Date;
  weekday: Weekday;
}
