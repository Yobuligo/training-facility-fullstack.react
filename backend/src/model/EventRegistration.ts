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

export const relHasManyEventRegistrations = "eventRegistrations";

export class EventRegistration extends eventRegistration {
  static associate() {
    EventRegistration.belongsTo(EventInstance, { onDelete: "CASCADE" });
    EventInstance.hasMany(EventRegistration, {
      as: relHasManyEventRegistrations,
      foreignKey: "eventInstanceId",
    });

    EventRegistration.belongsTo(User, { onDelete: "CASCADE" });
    User.hasMany(EventRegistration, { foreignKey: "userId" });
  }
}
