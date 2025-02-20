import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { DateTime } from "../core/services/date/DateTime";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { IEvent } from "../features/eventCalendar/model/IEvent";
import {
  EventDefinitionRouteMeta,
  IEventDefinition,
} from "../shared/model/IEventDefinition";
import { EventInstanceRouteMeta } from "../shared/model/IEventInstance";
import { IEventInstanceItemModelAndRole } from "../shared/model/IEventInstanceItemModelAndRole";
import { UserRouteMeta } from "../shared/model/IUser";
import { IUserShort } from "../shared/model/IUserShort";
import { EventInstanceState } from "../shared/types/EventInstanceState";
import { ITrainer, TrainerRouteMeta } from "../shared/types/ITrainer";
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
    includeIsCurrentUserTrainer: boolean,
    fields: K[]
  ): Promise<IEntitySubset<IEventInstance, K>>;
  findByDateTimeSpanAndUser(
    dateTimeSpan: IDateTimeSpan,
    userId: string,
    includeIsCurrentUserTrainer: boolean
  ): Promise<IEventInstance[]>;
  async findByDateTimeSpanAndUser(
    dateTimeSpan: IDateTimeSpan,
    userId: string,
    includeIsCurrentUserTrainer: boolean,
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
        includeIsCurrentUserTrainer: includeIsCurrentUserTrainer.toString(),
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
      `${this.url}/${eventInstanceId}${UserRouteMeta.path}/${userId}${EventDefinitionRouteMeta.path}`
    );
  }

  /**
   * Finds an event definition with event instance and event registration by the given {@link eventInstanceId}.
   */
  async findByEventInstanceId(
    eventInstanceId: string
  ): Promise<IEventDefinition | undefined> {
    return RESTApi.get(
      `${this.url}/${eventInstanceId}${EventDefinitionRouteMeta.path}`
    );
  }

  // async findByEventInstance(eventInstanceId: string)

  /**
   * Returns the trainers for the given {@link eventInstanceId}.
   */
  async findTrainers(eventInstanceId: string): Promise<IUserShort[]> {
    return await RESTApi.get(`${this.url}/${eventInstanceId}/trainers`);
  }

  async findUpcomingByUserForWeek(
    userId: string
  ): Promise<IEventInstanceItemModelAndRole[]> {
    const today = new Date();
    const dateTimeSpan: IDateTimeSpan = {
      from: DateTime.getDayStartDate(today),
      to: DateTime.getWeekEndDate(today),
    };
    const eventInstanceItemModelAndRoles = await RESTApi.get<
      IEventInstanceItemModelAndRole[]
    >(`${this.url}/all/with-role`, {
      urlParams: {
        userId,
        from: dateTimeSpan.from.toString(),
        to: dateTimeSpan.to.toString(),
      },
    });
    return eventInstanceItemModelAndRoles;
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

  /**
   * Updates the trainers of the event instance with id {@link eventInstanceId} by the given {@link trainers}.
   */
  async updateTrainers(
    eventInstanceId: string,
    trainers: ITrainer[]
  ): Promise<void> {
    return await RESTApi.put(
      `${this.url}/${eventInstanceId}${TrainerRouteMeta.path}`,
      trainers
    );
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
      trainers: event.eventDefinition.trainers?.map((trainer) => ({
        ...trainer,
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
