import { DateTime } from "../core/services/date/DateTime";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { checkNotNull } from "../core/utils/checkNotNull";
import { IEvent } from "../features/eventCalendar/model/IEvent";
import {
  EventInstanceRouteMeta,
  IEventInstance,
} from "../shared/model/IEventInstance";
import { EventInstanceState } from "../shared/types/EventInstanceState";
import { uuid } from "../utils/uuid";
import { EntityRepository } from "./core/EntityRepository";
import { RESTApi } from "./core/RESTApi";

export class EventInstanceApi extends EntityRepository<IEventInstance> {
  constructor() {
    super(EventInstanceRouteMeta);
  }

  async findByDateTimeSpanAndUser(
    dateTimeSpan: IDateTimeSpan,
    userId: string
  ): Promise<IEventInstance[]> {
    return await RESTApi.get(`${this.url}`, {
      urlParams: {
        from: dateTimeSpan.from.toString(),
        to: dateTimeSpan.to.toString(),
        userId: userId,
      },
    });
  }

  async findByUserForWeek(userId: string): Promise<IEventInstance[]> {
    const today = new Date();
    const dateTimeSpan: IDateTimeSpan = {
      from: DateTime.getDayStartDate(today),
      to: DateTime.getWeekEndDate(today),
    };
    const eventInstances = await this.findByDateTimeSpanAndUser(
      dateTimeSpan,
      userId
    );
    eventInstances.sort((left, right) =>
      DateTime.compare(checkNotNull(left).from, checkNotNull(right).from)
    );
    return eventInstances;
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
