import { Model, ModelStatic } from "sequelize";
import { db } from "../db/db";
import { IEventDefinitionTrainer } from "../shared/model/IEventDefinitionTrainer";
import { EventDefinition } from "./EventDefinition";
import { User } from "./User";

const eventDefinitionTrainer: ModelStatic<Model<IEventDefinitionTrainer>> =
  db.define("event-definitions-trainers", {} as any);

export class EventDefinitionTrainer extends eventDefinitionTrainer {
  static associate() {
    EventDefinition.belongsToMany(User, {
      through: "event-definitions-trainers",
    });

    User.belongsToMany(EventDefinition, {
      through: "event-definitions-trainers",
    });
  }
}
