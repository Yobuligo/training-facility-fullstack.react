import { DateTime } from "../core/services/date/DateTime";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { IEventInstance } from "../shared/model/IEventInstance";
import {
  EventRegistrationRouteMeta,
  IEventRegistration,
} from "../shared/model/IEventRegistration";
import { EventRegistrationState } from "../shared/types/EventRegistrationState";
import { uuid } from "../utils/uuid";
import { EntityRepository } from "./core/EntityRepository";
import { attach } from "./utils/attach";

export class EventRegistrationApi extends EntityRepository<IEventRegistration> {
  constructor() {
    super(EventRegistrationRouteMeta);
  }

  async delete(eventRegistration: IEventRegistration): Promise<boolean> {
    // const index = DummyEventRegistrations.findIndex(
    //   (item) => item.id === eventRegistration.id
    // );
    // if (index !== -1) {
    //   DummyEventRegistrations.splice(index, 1);

    //   // detach from eventInstance
    //   const indexInstance =
    //     eventRegistration.eventInstance?.eventRegistrations?.findIndex(
    //       (item) => item.id === eventRegistration.id
    //     );
    //   if (indexInstance !== undefined && indexInstance !== -1) {
    //     eventRegistration.eventInstance?.eventRegistrations?.splice(
    //       indexInstance,
    //       1
    //     );
    //   }
    //   return true;
    // }
    // return false;
    return false;
  }

  async insert(
    eventRegistration: IEventRegistration
  ): Promise<IEventRegistration> {
    // Todo: Check if user is already registered
    // DummyEventRegistrations.push(eventRegistration);
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
      eventInstanceId: eventInstance.id,
      state: EventRegistrationState.OPEN,
      manuallyAdded: false,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // attach created eventRegistration to eventInstance
    if (eventInstance.eventRegistrations) {
      attach(eventInstance.eventRegistrations, eventRegistration);
    }

    return await this.insert(eventRegistration);
  }

  /**
   * Finds all event registrations of the given {@link userId} for the given {@link dateTimeSpan}.
   */
  async findByDateTimeAndUser(
    dateTimeSpan: IDateTimeSpan,
    userId: string
  ): Promise<IEventRegistration[]> {
    // const eventRegistrations = DummyEventRegistrations.filter(
    //   (eventRegistration) =>
    //     DateTime.spanContains(
    //       dateTimeSpan,
    //       checkNotNull(eventRegistration.eventInstance?.from)
    //     ) && eventRegistration.userId === userId
    // );
    // return eventRegistrations;
    return [];
  }

  /**
   * Finds all upcoming event registrations of the given {@link userId} for the current week
   */
  async findByUserForWeek(userId: string): Promise<IEventRegistration[]> {
    const today = new Date();
    const dateTimeSpan: IDateTimeSpan = {
      from: DateTime.getDayStartDate(today),
      to: DateTime.getWeekEndDate(today),
    };
    const eventRegistrations = this.findByDateTimeAndUser(dateTimeSpan, userId);
    return eventRegistrations;
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
