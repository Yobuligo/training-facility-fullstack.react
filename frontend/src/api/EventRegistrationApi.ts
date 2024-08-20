import { IEventInstance } from "../shared/model/IEventInstance";
import {
  EventRegistrationRouteMeta,
  IEventRegistration,
} from "../shared/model/IEventRegistration";
import { EventState } from "../shared/types/EventState";
import { uuid } from "../utils/uuid";
import { EntityRepository } from "./core/EntityRepository";
import { DummyEventRegistrations } from "./DummyEventRegistrations";

export class EventRegistrationApi extends EntityRepository<IEventRegistration> {
  constructor() {
    super(EventRegistrationRouteMeta);
  }

  async delete(eventRegistration: IEventRegistration): Promise<boolean> {
    const index = DummyEventRegistrations.findIndex(
      (item) => item.id === eventRegistration.id
    );
    if (index !== -1) {
      DummyEventRegistrations.splice(index, 1);
      return true;
    }
    return false;
  }

  async insert(
    eventRegistration: IEventRegistration
  ): Promise<IEventRegistration> {
    DummyEventRegistrations.push(eventRegistration);
    return eventRegistration;
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
      eventInstance,
      eventInstanceId: eventInstance.id,
      eventState: EventState.CHECKED_IN,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return await this.insert(eventRegistration);
  }
}
