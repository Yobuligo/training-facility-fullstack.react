import { EventDefinition } from "../model/EventDefinition";
import { EventInstance } from "../model/EventInstance";
import { IEventDefinition } from "../shared/model/IEventDefinition";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class EventDefinitionRepo extends SequelizeRepository<IEventDefinition> {
  constructor() {
    super(EventDefinition, [{ model: EventInstance, as: "eventInstances" }]);
  }
}
