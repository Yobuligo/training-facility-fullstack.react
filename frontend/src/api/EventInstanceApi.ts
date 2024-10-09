import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { DateTime } from "../core/services/date/DateTime";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { IEvent } from "../features/eventCalendar/model/IEvent";
import {
  EventDefinitionRouteMeta,
  IEventDefinition,
} from "../shared/model/IEventDefinition";
import { EventInstanceRouteMeta } from "../shared/model/IEventInstance";
import { EventInstanceState } from "../shared/types/EventInstanceState";
import { uuid } from "../utils/uuid";
import { IEventInstance } from "./../shared/model/IEventInstance";
import { EntityRepository } from "./core/EntityRepository";
import { RESTApi } from "./core/RESTApi";

export class EventInstanceApi extends EntityRepository<IEventInstance> {
  constructor() {
    super(EventInstanceRouteMeta);
  }

  findByDateTimeSpanAndUser<K extends keyof IEventInstance>(
    dateTimeSpan: IDateTimeSpan,
    userId: string,
    fields: K[]
  ): Promise<IEntitySubset<IEventInstance, K>>;
  findByDateTimeSpanAndUser(
    dateTimeSpan: IDateTimeSpan,
    userId: string
  ): Promise<IEventInstance[]>;
  async findByDateTimeSpanAndUser(
    dateTimeSpan: IDateTimeSpan,
    userId: string,
    fields?: unknown
  ): Promise<unknown> {
    let requestedFields: string[] = [];
    if (fields && Array.isArray(fields)) {
      requestedFields = fields;
    }
    return await RESTApi.get(`${this.url}`, {
      fields: requestedFields,
      urlParams: {
        from: dateTimeSpan.from.toString(),
        to: dateTimeSpan.to.toString(),
        userId: userId,
      },
    });
  }

  /**
   * Finds an event definition with event instance and event registration by the given {@link eventInstanceId} and for the user of the given {@link userId}.
   */
  async findByEventInstanceAndUser(
    eventInstanceId: string,
    userId: string
  ): Promise<IEventDefinition | undefined> {
    return RESTApi.get(
      `${this.url}/${eventInstanceId}${EventDefinitionRouteMeta.path}`,
      {
        urlParams: {
          userId,
        },
      }
    );
  }

  findByUserForWeek<K extends keyof IEventInstance>(
    userId: string,
    fields: K[]
  ): Promise<IEntitySubset<IEventInstance, K>[]>;
  findByUserForWeek(userId: string): Promise<IEventInstance[]>;
  async findByUserForWeek<K extends keyof IEventInstance>(
    userId: string,
    fields?: K[]
  ): Promise<unknown> {
    const today = new Date();
    const dateTimeSpan: IDateTimeSpan = {
      from: DateTime.getDayStartDate(today),
      to: DateTime.getWeekEndDate(today),
    };
    const eventInstances = await this.findByDateTimeSpanAndUser(
      dateTimeSpan,
      userId,
      fields as any
    );
    return eventInstances;
  }

  /**
   * Creates a new event instance from the given {@link event}, inserts it to the persistance
   * and returns it.
   */
  async insertFromEvent(event: IEvent): Promise<IEventInstance> {
    const eventInstance = this.createEventInstanceByEvent(event);
    return await this.insert(eventInstance);
  }

  async insertFromEventSecured(event: IEvent): Promise<IEventInstance> {
    const eventInstance = this.createEventInstanceByEvent(event);
    return await RESTApi.post(`${this.publicUrl}`, eventInstance);
  }

  private createEventInstanceByEvent(event: IEvent): IEventInstance {
    return {
      id: uuid(),
      calledOff: false,
      color: event.eventDefinition.color,
      description: event.eventDefinition.description,
      title: event.eventDefinition.title,
      eventDefinitionId: event.eventDefinition.id,
      eventRegistrations: [],
      from: event.dateTimeSpan.from,
      to: event.dateTimeSpan.to,
      state: EventInstanceState.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
