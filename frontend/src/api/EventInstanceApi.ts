import { checkNotNull } from "../core/utils/checkNotNull";
import { IEvent } from "../features/eventCalendar/model/IEvent";
import {
  EventInstanceRouteMeta,
  IEventInstance,
} from "../shared/model/IEventInstance";
import { IEventRegistration } from "../shared/model/IEventRegistration";
import { EventInstanceState } from "../shared/types/EventInstanceState";
import { uuid } from "../utils/uuid";
import { EntityRepository } from "./core/EntityRepository";
import { DummyEventInstances } from "./DummyEventInstances";
import { DummyEventRegistrations } from "./DummyEventRegistrations";
import { DummyUserProfiles } from "./DummyUserProfiles";
import { attach } from "./utils/attach";

export class EventInstanceApi extends EntityRepository<IEventInstance> {
  constructor() {
    super(EventInstanceRouteMeta);
  }

  async addEventRegistration(
    eventInstance: IEventInstance,
    eventRegistration: IEventRegistration
  ): Promise<void> {
    DummyEventRegistrations.push(eventRegistration);
    if (eventInstance.eventRegistrations) {
      attach(eventInstance.eventRegistrations, eventRegistration);
    }
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

  async findRegistrations(
    eventInstanceId: string
  ): Promise<IEventRegistration[]> {
    const eventInstance = DummyEventInstances.find(
      (item) => item.id === eventInstanceId
    );

    const eventRegistrations = eventInstance?.eventRegistrations;
    // attach user profile
    eventRegistrations?.forEach((eventRegistration) => {
      const userProfile = DummyUserProfiles.find(
        (userProfile) => userProfile.userId === eventRegistration.userId
      );
      eventRegistration.userProfile = userProfile;
    });

    return eventInstance?.eventRegistrations ?? [];
  }
}
