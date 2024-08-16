import { Weekday } from "../../../core/types/Weekday";

/**
 * positionInGrid is e.g. 1 for Monday, if this is the first day to be shown
 */
export interface IWeekdayHeaderProps {
  positionInGrid: number;
  weekday: Weekday;
  blockColumnSpan: number;
}
