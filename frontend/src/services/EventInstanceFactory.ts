import { checkNotNull } from "../core/utils/checkNotNull";
import { IEvent } from "../features/eventCalendar/model/IEvent";
import { IEventInstance } from "../shared/model/IEventInstance";
import { EventInstanceState } from "../shared/types/EventInstanceState";
import { uuid } from "../utils/uuid";

/**
 * This class is responsible for creating instances of type {@link IEventInstance}.
 */
export class EventInstanceFactory {
  createFromEvent(event: IEvent): IEventInstance {
    return {
      id: uuid(),
      description: event.eventDefinition.description,
      title: event.eventDefinition.title,
      eventDefinition: event.eventDefinition,
      eventDefinitionId: event.eventDefinition.id,
      eventRegistrations: [],
      from: checkNotNull(event.start),
      to: checkNotNull(event.end),
      state: EventInstanceState.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
