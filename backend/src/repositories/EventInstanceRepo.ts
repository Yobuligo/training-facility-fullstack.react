import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { EventInstance } from "../model/EventInstance";
import { EventRegistration } from "../model/EventRegistration";
import { IEventInstance } from "../shared/model/IEventInstance";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class EventInstanceRepo extends SequelizeRepository<IEventInstance> {
  constructor() {
    super(EventInstance, [
      { model: EventRegistration, as: "eventRegistrations" },
    ]);
  }

  findByDateTimeSpanAndUser(
    dateTimeSpan: IDateTimeSpan,
    userId: string,
    field: (keyof IEventInstance)[]
  ): Promise<IEventInstance[]> {
    throw new Error();
  }
}
