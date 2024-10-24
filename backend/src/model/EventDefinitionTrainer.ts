import { db } from "../db/db";
import { EventDefinition } from "./EventDefinition";
import { User } from "./User";

const eventDefinitionTrainer = db.define(
  "event-definitions-trainers",
  {},
  { timestamps: false }
);

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
