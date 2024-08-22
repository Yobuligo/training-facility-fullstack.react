import { checkNotNull } from "../core/utils/checkNotNull";
import { IEvent } from "../features/eventCalendar/model/IEvent";
import {
  EventInstanceRouteMeta,
  IEventInstance,
} from "../shared/model/IEventInstance";
import { uuid } from "../utils/uuid";
import { Repository } from "./core/Repository";
import { DummyEventInstances } from "./DummyEventInstances";
import { attach } from "./utils/attach";

export class EventInstanceApi extends Repository<IEventInstance> {
  constructor() {
    super(EventInstanceRouteMeta);
  }

  async insert(eventInstance: IEventInstance): Promise<IEventInstance> {
    DummyEventInstances.push(eventInstance);
    return eventInstance;
  }

  /**
   * Creates a new event instance from the given {@link event}, inserts it to the persistance
   * and returns it.
   */
  async insertFromEvent(event: IEvent): Promise<IEventInstance> {
    const eventInstance: IEventInstance = {
      id: uuid(),
      description: event.eventDefinition.description,
      title: event.eventDefinition.title,
      eventDefinition: event.eventDefinition,
      eventDefinitionId: event.eventDefinition.id,
      eventRegistrations: [],
      from: checkNotNull(event.start),
      to: checkNotNull(event.end),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // attach created eventInstance to eventDefinition
    attach(event.eventDefinition.eventInstances, eventInstance);

    return await this.insert(eventInstance);
  }
}
