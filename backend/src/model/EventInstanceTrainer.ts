import { Model, ModelStatic } from "sequelize";
import { db } from "../db/db";
import { IEventInstanceTrainer } from "../shared/model/IEventInstanceTrainer";
import { EventInstance } from "./EventInstance";
import { User } from "./User";

const eventInstanceTrainer: ModelStatic<Model<IEventInstanceTrainer>> =
  db.define("event-instances-trainers", {} as any);

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
