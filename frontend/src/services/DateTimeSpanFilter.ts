import { View } from "react-big-calendar";
import { AppConfig } from "../AppConfig";
import { NotSupportedError } from "../core/errors/NotSupportedError";
import { DateTime } from "../core/services/date/DateTime";
import { IDateTimeSpanFilter } from "./IDateTimeSpanFilter";

/**
 * This service is responsible for providing the default values for the date time span filter.
 * It is used to define the default *from* and *to* value depending on the big calendar *view*, which might be *day* or *week* and set in the AppConfig.
 */
export class DateTimeSpanFilter implements IDateTimeSpanFilter {
  get from(): Date {
    switch (this.deriveViewFromConfig()) {
      case "day": {
        return DateTime.getDayStartDate(new Date());
      }
      case "week": {
        return DateTime.getWeekStartDate(new Date());
      }
      default: {
        throw new NotSupportedError(
          "Error while getting date time span from value. Set big calender view is not supported. Set valid view."
        );
      }
    }
  }

  get to(): Date {
    switch (this.deriveViewFromConfig()) {
      case "day": {
        return DateTime.getDayEndDate(new Date());
      }
      case "week": {
        return DateTime.getWeekEndDate(new Date());
      }
      default: {
        throw new NotSupportedError(
          "Error while getting date time span to value. Set big calender view is not supported. Set valid view."
        );
      }
    }
  }

  get view(): View {
    return this.deriveViewFromConfig();
  }

  private deriveViewFromConfig(): View {
    switch (AppConfig.defaultDateTimeSpanFilter) {
      case "day": {
        return "day";
      }
      case "week": {
        return "week";
      }
      default: {
        throw new NotSupportedError(
          "Error while getting DateTimeSpanFilter view. Unknown or not supported default date time span filter in AppConfig. Set valid defaultDateTimeSpanFilter in AppConfig"
        );
      }
    }
  }
}
