import { useEffect, useMemo, useState } from "react";
import { View } from "react-big-calendar";
import { EventDefinitionApi } from "../../../api/EventDefinitionApi";
import { NotSupportedError } from "../../../core/errors/NotSupportedError";
import { DateTime } from "../../../core/services/date/DateTime";
import { DateTimeIterator } from "../../../core/services/date/DateTimeIterator";
import { IDateTimeSpan } from "../../../core/services/date/IDateTimeSpan";
import { DummyEventDefinition } from "../../../model/DummyEventDefinition";
import { IEventDefinition } from "../../../shared/model/IEventDefinition";
import { Recurrence } from "../../../shared/types/Recurrence";
import { matchesDateTimeSpan } from "../../../utils/matchesDateTimeSpan";
import { uuid } from "../../../utils/uuid";
import { IEvent } from "./IEvent";

const eventDefinitionsToEvent = (
  eventDefinitions: IEventDefinition[],
  from: Date,
  to: Date
): IEvent[] => {
  // an EventDefinition can occur several times
  // assume an EventDefinition occurs each monday and the range is a month
  // then we have to create events for each monday

  const events: IEvent[] = [];

  eventDefinitions.forEach((eventDefinition) => {
    switch (eventDefinition.recurrence) {
      case Recurrence.ONCE: {
        events.push({
          id: uuid(),
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

          events.push({
            id: uuid(),
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
            events.push({
              id: uuid(),
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
            events.push({
              id: uuid(),
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
  return events;
};

export const useEventPlanSectionViewModel = () => {
  const [selectedEventDefinition, setSelectedEventDefinition] = useState<
    IEventDefinition | undefined
  >(undefined);
  const [view, setView] = useState<View>("week");
  const [events, setEvents] = useState<IEvent[]>([]);

  let from: Date = useMemo(() => {
    switch (view) {
      case "day": {
        return new Date();
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
  }, [view]);

  let to: Date = useMemo(() => {
    switch (view) {
      case "day": {
        return new Date();
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
  }, [view]);

  const loadEventDefinitions = async (from: Date, to: Date) => {
    const dateTimeSpan: IDateTimeSpan = { from, to };
    const eventDefinitionApi = new EventDefinitionApi();
    const eventDefinitions = await eventDefinitionApi.findByDateTimeSpan(
      dateTimeSpan
    );
    const events = eventDefinitionsToEvent(eventDefinitions, from, to);
    setEvents(events);
  };

  useEffect(() => {
    loadEventDefinitions(from, to);
  }, [from, to]);

  const onAdd = () => setSelectedEventDefinition(new DummyEventDefinition());

  const onBack = () => setSelectedEventDefinition(undefined);

  const onEventRangeChanged = (
    eventRange: Date[] | { start: Date; end: Date } | undefined
  ) => {
    if (Array.isArray(eventRange)) {
      from = eventRange[0];
      to = eventRange[eventRange.length - 1];
      loadEventDefinitions(from, to);
      return;
    }

    if (typeof eventRange === "object") {
      from = (eventRange as any).start as Date;
      to = (eventRange as any).end as Date;
      loadEventDefinitions(from, to);
      return;
    }

    throw new NotSupportedError();
  };

  const onEventSelected = (event: IEvent) =>
    setSelectedEventDefinition(event.eventDefinition);

  const onSaveEventDefinition = async (eventDefinition: IEventDefinition) => {
    const eventDefinitionApi = new EventDefinitionApi();
    if (
      eventDefinition instanceof DummyEventDefinition &&
      !eventDefinition.isPersisted
    ) {
      await eventDefinitionApi.insert(eventDefinition);
      eventDefinition.setIsPersisted();
    } else {
      await eventDefinitionApi.update(eventDefinition);
    }

    loadEventDefinitions(from, to);
  };

  const onViewChanged = (view: View) => setView(view);

  return {
    events,
    onAdd,
    onBack,
    onEventRangeChanged,
    onEventSelected,
    onSaveEventDefinition,
    onViewChanged,
    selectedEventDefinition,
    view,
  };
};
