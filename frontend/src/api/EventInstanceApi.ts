import { checkNotNull } from "../core/utils/checkNotNull";
import { IEvent } from "../features/eventCalendar/model/IEvent";
import {
  EventInstanceRouteMeta,
  IEventInstance,
} from "../shared/model/IEventInstance";
import { EventInstanceState } from "../shared/types/EventInstanceState";
import { uuid } from "../utils/uuid";
import { EntityRepository } from "./core/EntityRepository";

export class EventInstanceApi extends EntityRepository<IEventInstance> {
  constructor() {
    super(EventInstanceRouteMeta);
  }

  /**
   * Creates a new event instance from the given {@link event}, inserts it to the persistance
   * and returns it.
   */
  async insertFromEvent(event: IEvent): Promise<IEventInstance> {
    const eventInstance: IEventInstance = {
      id: uuid(),
      color: event.eventDefinition.color,
      description: event.eventDefinition.description,
      title: event.eventDefinition.title,
      eventDefinitionId: event.eventDefinition.id,
      eventRegistrations: [],
      from: checkNotNull(event.start),
      to: checkNotNull(event.end),
      state: EventInstanceState.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return await this.insert(eventInstance);
  }
}
