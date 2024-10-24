import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IEventDefinition } from "../shared/model/IEventDefinition";
import { createIdType } from "./core/createIdType";
import { User } from "./User";

const eventDefinition: ModelStatic<
  Model<IEventDefinition, IEntityDetails<IEventDefinition>>
> = db.define("event-definitions", {
  id: createIdType(),
  isMemberOnly: DataTypes.BOOLEAN,
  recurrence: DataTypes.INTEGER,

  // EventDetails
  color: {
    type: DataTypes.STRING(10),
  },
  description: DataTypes.STRING(100),
  from: DataTypes.DATE,
  title: DataTypes.STRING(100),
  to: DataTypes.DATE,
});

export class EventDefinition extends eventDefinition {
  static associate() {
    EventDefinition.belongsTo(User, { foreignKey: "creatorUserId" });
  }
}
