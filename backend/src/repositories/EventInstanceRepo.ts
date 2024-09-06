import { Op } from "sequelize";
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

  async findByDateTimeSpanAndUser(
    dateTimeSpan: IDateTimeSpan,
    userId: string,
    fields: (keyof IEventInstance)[]
  ): Promise<IEventInstance[]> {
    const data = await this.model.findAll({
      where: {
        from: { [Op.gte]: dateTimeSpan.from },
        to: { [Op.lte]: dateTimeSpan.to },
      },
      attributes: this.getAttributes(fields),
      include: [
        {
          model: EventRegistration,
          as: "eventRegistrations",
          where: {
            userId: userId,
          },
        },
      ],
    });

    let eventInstances = data.map((model) => model.toJSON());
    eventInstances = this.restrictEntitiesFields(eventInstances, fields);
    return eventInstances;
  }
}
