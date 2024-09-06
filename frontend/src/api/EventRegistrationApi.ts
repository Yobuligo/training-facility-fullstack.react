import {
  EventInstanceRouteMeta,
  IEventInstance,
} from "../shared/model/IEventInstance";
import {
  EventRegistrationRouteMeta,
  IEventRegistration,
} from "../shared/model/IEventRegistration";
import { EventRegistrationState } from "../shared/types/EventRegistrationState";
import { uuid } from "../utils/uuid";
import { EntityRepository } from "./core/EntityRepository";
import { RESTApi } from "./core/RESTApi";

export class EventRegistrationApi extends EntityRepository<IEventRegistration> {
  constructor() {
    super(EventRegistrationRouteMeta);
  }

  async findByEventInstanceId(
    eventInstanceId: string
  ): Promise<IEventRegistration[]> {
    return await RESTApi.get(
      `${this.host}${EventInstanceRouteMeta.path}/${eventInstanceId}${EventRegistrationRouteMeta.path}`
    );
  }

  /**
   * Creates a new event registration from the given {@link eventInstance} and {@link userId}, inserts it to the persistance
   * and returns it.
   */
  async insertFromEventInstance(
    eventInstance: IEventInstance,
    userId: string
  ): Promise<IEventRegistration> {
    const eventRegistration: IEventRegistration = {
      id: uuid(),
      eventInstanceId: eventInstance.id,
      state: EventRegistrationState.OPEN,
      manuallyAdded: false,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return await this.insert(eventRegistration);
  }

  update<K extends keyof IEventRegistration>(
    entity: IEventRegistration,
    fields: K[]
  ): Promise<boolean>;
  update(entity: IEventRegistration): Promise<boolean>;
  async update(entity: IEventRegistration, fields?: unknown): Promise<unknown> {
    return entity;
    //   return List.update(
    //     DummyEventRegistrations,
    //     entity,
    //     (item) => item.id === entity.id
    //   );
  }
}
