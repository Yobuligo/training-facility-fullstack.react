import { EventRegistration } from "../model/EventRegistration";
import { User } from "../model/User";
import { UserProfile } from "../model/UserProfile";
import { IEventRegistration } from "../shared/model/IEventRegistration";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class EventRegistrationRepo extends SequelizeRepository<IEventRegistration> {
  constructor() {
    super(EventRegistration, [
      {
        model: User,
        as: "user",
        include: [{ model: UserProfile, as: "userProfile" }],
      },
    ]);
  }

  async findByEventInstanceId(
    eventInstanceId: string
  ): Promise<IEventRegistration[]> {
    const data = await this.model.findAll({
      where: { eventInstanceId },
      include: [
        {
          model: User,
          as: "user",
          include: [{ model: UserProfile, as: "userProfile" }],
        },
      ],
    });
    return data.map((model) => model.toJSON());
  }
}
