import { DateTime } from "../core/services/date/DateTime";
import { checkNotNull } from "../core/utils/checkNotNull";
import { IEvent } from "../features/eventCalendar/model/IEvent";
import { IEventInstance } from "../shared/model/IEventInstance";
import { IEventRegistration } from "../shared/model/IEventRegistration";

/**
 * This class is responsible for providing access to specific information regarding and instance of type {@link IEvent}
 */
export class EventInfo {
  /**
   * Finds an event instance, from the attached event definition of the {@link event},
   * which matches the {@link event} start date.
   */
  static findEventInstance(event: IEvent): IEventInstance | undefined {
    const eventInstance = event.eventDefinition.eventInstances?.find(
      (eventInstance) =>
        DateTime.equals(eventInstance.from, checkNotNull(event.start)) &&
        DateTime.equals(eventInstance.to, checkNotNull(event.end))
    );
    return eventInstance;
  }

  /**
   * Finds the first event registration, from the attached event definition of the {@link event},
   * which matches the event start date and belongs to a specific user
   */
  static findFirstEventRegistrationByUserId(
    event: IEvent,
    userId: string
  ):
    | {
        instance: IEventRegistration;
        eventInstance: IEventInstance;
      }
    | undefined {
    const eventInstances = event.eventDefinition.eventInstances;
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
            DateTime.equals(eventInstance.from, checkNotNull(event.start)) &&
            DateTime.equals(eventInstance.to, checkNotNull(event.end))
          ) {
            return { instance: eventRegistration, eventInstance };
          }
        }
      }
    }

    return undefined;
  }
}
