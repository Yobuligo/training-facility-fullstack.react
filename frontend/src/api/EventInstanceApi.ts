import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { DateTime } from "../core/services/date/DateTime";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { checkNotNull } from "../core/utils/checkNotNull";
import { ICalendarEvent } from "../features/eventCalendar/model/ICalendarEvent";
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
   * Creates a new event instance from the given {@link calendarEvent}, inserts it to the persistance
   * and returns it.
   */
  async insertFromEvent(
    calendarEvent: ICalendarEvent
  ): Promise<IEventInstance> {
    const eventInstance = this.createEventInstanceByEvent(calendarEvent);
    return await this.insert(eventInstance);
  }

  async insertFromEventSecured(
    calendarEvent: ICalendarEvent
  ): Promise<IEventInstance> {
    const eventInstance = this.createEventInstanceByEvent(calendarEvent);
    return await RESTApi.post(`${this.publicUrl}`, eventInstance);
  }

  private createEventInstanceByEvent(
    calendarEvent: ICalendarEvent
  ): IEventInstance {
    return {
      id: uuid(),
      color: calendarEvent.eventDefinition.color,
      description: calendarEvent.eventDefinition.description,
      title: calendarEvent.eventDefinition.title,
      eventDefinitionId: calendarEvent.eventDefinition.id,
      eventRegistrations: [],
      from: checkNotNull(calendarEvent.start),
      to: checkNotNull(calendarEvent.end),
      state: EventInstanceState.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
