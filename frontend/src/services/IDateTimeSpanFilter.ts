import { View } from "react-big-calendar";

/**
 * This service is responsible for providing the default values for the date time span filter.
 * It is used to define the default *from* and *to* value depending on the big calendar *view*, which might be day or week.
 */
export interface IDateTimeSpanFilter {
  readonly from: Date;
  readonly to: Date;
  readonly view: View;
}
