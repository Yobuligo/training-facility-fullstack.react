import { DateTime } from "../core/services/date/DateTime";
import { checkNotNull } from "../core/utils/checkNotNull";
import { ICalendarEvent } from "../features/eventCalendar/model/ICalendarEvent";
import { IEventInstance } from "../shared/model/IEventInstance";
import { IEventRegistration } from "../shared/model/IEventRegistration";

/**
 * This class is responsible for providing access to specific information regarding and instance of type {@link ICalendarEvent}
 */
export class EventInfo {
  /**
   * Finds an event instance, from the attached event definition of the {@link calendarEvent},
   * which matches the {@link calendarEvent} start date.
   */
  static findEventInstance(
    calendarEvent: ICalendarEvent
  ): IEventInstance | undefined {
    const eventInstance = calendarEvent.eventDefinition.eventInstances?.find(
      (eventInstance) =>
        DateTime.equals(
          eventInstance.from,
          checkNotNull(calendarEvent.start)
        ) && DateTime.equals(eventInstance.to, checkNotNull(calendarEvent.end))
    );
    return eventInstance;
  }

  /**
   * Finds the first event registration, from the attached event definition of the {@link calendarEvent},
   * which matches the event start date and belongs to a specific user
   */
  static findFirstEventRegistrationByUserId(
    calendarEvent: ICalendarEvent,
    userId: string
  ):
    | {
        instance: IEventRegistration;
        eventInstance: IEventInstance;
      }
    | undefined {
    const eventInstances = calendarEvent.eventDefinition.eventInstances;
    if (!eventInstances) {
      return undefined;
    }

    for (let i = 0; i < eventInstances.length; i++) {
      const eventInstance = eventInstances[i];
      if (eventInstance.eventRegistrations) {
        for (let k = 0; k < eventInstance.eventRegistrations.length; k++) {
          const eventRegistration = checkNotNull(
            eventInstances[i].eventRegistrations?.[k]
          );
          if (
            eventRegistration.userId === userId &&
            DateTime.equals(
              eventInstance.from,
              checkNotNull(calendarEvent.start)
            ) &&
            DateTime.equals(eventInstance.to, checkNotNull(calendarEvent.end))
          ) {
            return { instance: eventRegistration, eventInstance };
          }
        }
      }
    }

    return undefined;
  }
}
