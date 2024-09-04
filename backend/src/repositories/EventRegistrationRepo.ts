import { EventRegistration } from "../model/EventRegistration";
import { IEventRegistration } from "../shared/model/IEventRegistration";
import { EventInstance } from "./../model/EventInstance";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class EventRegistrationRepo extends SequelizeRepository<IEventRegistration> {
  constructor() {
    super(EventRegistration, [{ model: EventInstance, as: "eventInstance" }]);
  }
}
