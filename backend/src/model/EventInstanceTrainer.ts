import { db } from "../db/db";
import { EventInstance } from "./EventInstance";
import { User } from "./User";

const eventInstanceTrainer = db.define(
  "event-instances-trainers",
  {},
  { timestamps: false }
);

export class EventInstanceTrainer extends eventInstanceTrainer {
  static associate() {
    EventInstance.belongsToMany(User, {
      through: "event-instances-trainers",
    });

    User.belongsToMany(EventInstance, {
      through: "event-instances-trainers",
    });
  }
}
