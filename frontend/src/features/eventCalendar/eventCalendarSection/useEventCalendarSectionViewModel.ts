import { useCallback, useEffect, useState } from "react";
import { View } from "react-big-calendar";
import { NotSupportedError } from "../../../core/errors/NotSupportedError";
import { DateTime } from "../../../core/services/date/DateTime";
import { DateTimeIterator } from "../../../core/services/date/DateTimeIterator";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { Recurrence } from "../../../core/types/Recurrence";
import { checkNotNull } from "../../../core/utils/checkNotNull";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { useRequest } from "../../../lib/userSession/hooks/useRequest";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { matchesDateTimeSpan } from "../../../utils/matchesDateTimeSpan";
import { ICalendarEvent } from "../model/ICalendarEvent";
import { IEventCalendarSectionProps } from "./IEventCalendarSectionProps";

const eventDefinitionsToEvent = (
  eventDefinitions: IEventDefinition[],
  from: Date,
  to: Date
): ICalendarEvent[] => {
  // an EventDefinition can occur several times
  // assume an EventDefinition occurs each monday and the range is a month
  // then we have to create events for each monday

  const calendarEvents: ICalendarEvent[] = [];

  eventDefinitions.forEach((eventDefinition) => {
    switch (eventDefinition.recurrence) {
      case Recurrence.ONCE: {
        calendarEvents.push({
          id: eventDefinition.id,
          eventDefinition,
          start: eventDefinition.from,
          end: eventDefinition.to,
          title: eventDefinition.title,
        });
        break;
      }
      case Recurrence.DAILY: {
        // daily events must be added for each day of the date time span
        // which are greater than the from and smaller then to date of the eventDefinition
        DateTimeIterator.iterate(from, to, (current) => {
          if (!matchesDateTimeSpan(current, current, eventDefinition)) {
            return;
          }

          calendarEvents.push({
            id: eventDefinition.id,
            eventDefinition,
            start: DateTime.create(
              DateTime.toDate(current),
              DateTime.toTime(eventDefinition.from)
            ),
            end: DateTime.create(
              DateTime.toDate(current),
              DateTime.toTime(eventDefinition.to)
            ),
            title: eventDefinition.title,
          });
        });
        break;
      }
      case Recurrence.WEEKLY: {
        // find weekday of EventDefinition
        const weekday = eventDefinition.from.getDay();

        // add events for dates in the range with the same weekday,
        // which are greater than the from and smaller then to date of the eventDefinition
        DateTimeIterator.iterate(from, to, (current) => {
          if (!matchesDateTimeSpan(current, current, eventDefinition)) {
            return;
          }
          if (current.getDay() === weekday) {
            calendarEvents.push({
              id: eventDefinition.id,
              eventDefinition,
              start: DateTime.create(
                DateTime.toDate(current),
                DateTime.toTime(eventDefinition.from)
              ),
              end: DateTime.create(
                DateTime.toDate(current),
                DateTime.toTime(eventDefinition.to)
              ),
              title: eventDefinition.title,
            });
          }
        });
        break;
      }
      case Recurrence.MONTHLY: {
        DateTimeIterator.iterate(from, to, (current) => {
          // add entry for day if days are equal
          if (
            DateTime.toDay(current) === DateTime.toDay(eventDefinition.from)
          ) {
            calendarEvents.push({
              id: eventDefinition.id,
              eventDefinition,
              start: DateTime.create(
                DateTime.toDate(current),
                DateTime.toTime(eventDefinition.from)
              ),
              end: DateTime.create(
                DateTime.toDate(current),
                DateTime.toTime(eventDefinition.to)
              ),
              title: eventDefinition.title,
            });
          }
        });
        break;
      }
    }
  });
  return calendarEvents;
};

export const useEventCalendarSectionViewModel = (
  props: IEventCalendarSectionProps
) => {
  const screenSize = useScreenSize();
  const [view, setView] = useState<View>(screenSize.isSmall() ? "day" : "week");
  const [calendarEvents, setCalendarEvents] = useState<ICalendarEvent[]>([]);
  const [fromTime, setFromTime] = useState<Date | undefined>(undefined);
  const [toTime, setToTime] = useState<Date | undefined>(undefined);
  const [fromDate, setFromDate] = useState<Date>(() => {
    switch (view) {
      case "day": {
        return DateTime.getDayStartDate(new Date());
      }
      case "week": {
        return DateTime.getWeekStartDate(new Date());
      }
      case "month": {
        return DateTime.getMonthStartDate(new Date());
      }
      default:
        throw new NotSupportedError();
    }
  });
  const [toDate, setToDate] = useState<Date>(() => {
    switch (view) {
      case "day": {
        return DateTime.getDayEndDate(new Date());
      }
      case "week": {
        return DateTime.getWeekEndDate(new Date());
      }
      case "month": {
        return DateTime.getMonthEndDate(new Date());
      }
      default:
        throw new NotSupportedError();
    }
  });
  const [loadEventDefinitionRequest] = useRequest();

  const loadEventDefinitions = useCallback(
    async (from: Date, to: Date) =>
      loadEventDefinitionRequest(async () => {
        const dateTimeSpan: IDateTimeSpan = { from, to };
        const eventDefinitions = await props.eventDefinitionLoader(
          dateTimeSpan
        );
        const events = eventDefinitionsToEvent(eventDefinitions, from, to);
        setCalendarEvents(events);
      }),

    [loadEventDefinitionRequest, props]
  );

  useEffect(() => {
    loadEventDefinitions(fromDate, toDate);
    // loadEventDefinitions must not be part of the dependencies, otherwise we get an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDate, props.reloadSignal, toDate]);

  /**
   * Whenever the events change, we calculate the max time span, which should be displayed
   */
  useEffect(() => {
    const fromTime = DateTime.earliestTime(
      ...calendarEvents.map((event) => checkNotNull(event.start))
    );
    setFromTime(fromTime);

    let toTime = DateTime.latestTime(
      ...calendarEvents.map((event) => checkNotNull(event.end))
    );
    // display one more hour for to time to get a better overview
    if (toTime && DateTime.toHours(toTime) < 23) {
      toTime = DateTime.addMinutes(toTime, 15);
    }
    setToTime(toTime);
  }, [calendarEvents]);

  const onEventRangeChanged = (
    eventRange: Date[] | { start: Date; end: Date } | undefined
  ) => {
    if (Array.isArray(eventRange)) {
      setFromDate(eventRange[0]);
      const to = eventRange[eventRange.length - 1];
      setToDate(DateTime.create(DateTime.toDate(to), "23:59:59"));
      return;
    }

    if (typeof eventRange === "object") {
      setFromDate(eventRange.start);
      setToDate(DateTime.create(DateTime.toDate(eventRange.end), "23:59:59"));
      return;
    }

    throw new NotSupportedError();
  };

  const onViewChanged = (view: View) => setView(view);

  return {
    events: calendarEvents,
    fromTime,
    onEventRangeChanged,
    onViewChanged,
    toTime,
    view,
  };
};
