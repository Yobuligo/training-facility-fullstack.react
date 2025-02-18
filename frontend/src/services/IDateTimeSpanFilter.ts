import { View } from "react-big-calendar";

/**
 * This service is responsible for providing the default values for the date time span filter.
 * It is used to define the default *from* and *to* value depending on the big calendar *view*, which might be *day* or *week*.
 */
export interface IDateTimeSpanFilter {
  /**
   * Returns the default *from* value depending on the default date time span filter defined in the AppConfig.
   * E.g. returns the current start time of a day or of a week.
   */
  readonly from: Date;

  /**
   * Returns the default *from* value depending on the default date time span filter defined in the AppConfig.
   * E.g. returns the current end time of a day or of a week.
   */
  readonly to: Date;

  /**
   * Returns the default *from* value depending on the default date time span filter defined in the AppConfig.
   * E.g. returns *day* or *week*.
   */
  readonly view: View;

  /**
   * Overrides the default view which is derived from the AppConfig by the new value {@link view}.
   */
  overrideView(view: View): void;
}
