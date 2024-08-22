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
    const eventInstance = event.eventDefinition.eventInstances.find(
      (eventInstance) =>
        DateTime.equals(eventInstance.from, checkNotNull(event.start)) &&
        DateTime.equals(eventInstance.to, checkNotNull(event.end))
    );
    return eventInstance;
  }

  /**
   * Finds the first event registration, from the attached event definition of the {@link event},
   * which matches the event start date.
   */
  static findFirstEventRegistration(
    event: IEvent
  ): IEventRegistration | undefined {
    return this.findEventInstance(event)?.eventRegistrations[0];
  }
}
