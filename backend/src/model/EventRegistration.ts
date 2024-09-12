import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IEventRegistration } from "../shared/model/IEventRegistration";
import { createIdType } from "./core/createIdType";
import { EventInstance } from "./EventInstance";
import { User } from "./User";

const eventRegistration: ModelStatic<
  Model<IEventRegistration, IEntityDetails<IEventRegistration>>
> = db.define("event-registrations", {
  id: createIdType(),
  manuallyAdded: DataTypes.BOOLEAN,
  state: DataTypes.INTEGER,
});

export class EventRegistration extends eventRegistration {}

EventRegistration.belongsTo(EventInstance, { onDelete: "CASCADE" });
EventInstance.hasMany(EventRegistration, {
  as: "eventRegistrations",
  foreignKey: "eventInstanceId",
});

EventRegistration.belongsTo(User, { onDelete: "CASCADE" });
User.hasMany(EventRegistration, { foreignKey: "userId" });
