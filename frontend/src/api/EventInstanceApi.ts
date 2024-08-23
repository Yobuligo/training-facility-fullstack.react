import { List } from "../core/services/list/List";
import { IEvent } from "../features/eventCalendar/model/IEvent";
import { EventInstanceFactory } from "../services/EventInstanceFactory";
import {
  EventInstanceRouteMeta,
  IEventInstance,
} from "../shared/model/IEventInstance";
import { IEventRegistration } from "../shared/model/IEventRegistration";
import { Repository } from "./core/Repository";
import { DummyEventInstances } from "./DummyEventInstances";
import { DummyEventRegistrations } from "./DummyEventRegistrations";
import { DummyUserProfiles } from "./DummyUserProfiles";
import { attach } from "./utils/attach";

export class EventInstanceApi extends Repository<IEventInstance> {
  constructor() {
    super(EventInstanceRouteMeta);
  }

  async addEventRegistration(
    eventInstance: IEventInstance,
    eventRegistration: IEventRegistration
  ): Promise<void> {
    DummyEventRegistrations.push(eventRegistration);
    attach(eventInstance.eventRegistrations, eventRegistration);
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
    const eventInstanceFactory = new EventInstanceFactory();
    const eventInstance = eventInstanceFactory.createFromEvent(event);

    // attach created eventInstance to eventDefinition
    attach(event.eventDefinition.eventInstances, eventInstance);
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

  async update(eventInstance: IEventInstance): Promise<void> {
    List.update(
      DummyEventInstances,
      eventInstance,
      (item) => item.id === eventInstance.id
    );
  }
}
