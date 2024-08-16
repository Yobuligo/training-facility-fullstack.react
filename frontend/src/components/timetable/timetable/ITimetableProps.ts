import { IPlannedBlock } from "../IPlannedBlocks";

export interface ITimetableProps {
  timelineIntervalInMinutes: number;
  plannedBlocks: IPlannedBlock[];
  showEmptyDays?: boolean;
}
