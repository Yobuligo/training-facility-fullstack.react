import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { Value } from "../core/types/Value";

export const useDateTimeSpanFilter = (): Value<IDateTimeSpan> => {
  const context = useContext(AppContext);
  return [context.dateTimeSpanFilter[0], context.dateTimeSpanFilter[1]];
};
