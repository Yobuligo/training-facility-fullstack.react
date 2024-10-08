import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IEventInstance } from "../shared/model/IEventInstance";
import { createIdType } from "./core/createIdType";
import { EventDefinition } from "./EventDefinition";

const eventInstance: ModelStatic<
  Model<IEventInstance, IEntityDetails<IEventInstance>>
> = db.define("event-instances", {
  id: createIdType(),
  calledOff: DataTypes.BOOLEAN,
  color: {
    type: DataTypes.STRING(10),
  },
  description: DataTypes.STRING(100),
  from: DataTypes.DATE,
  state: DataTypes.INTEGER,
  title: DataTypes.STRING(100),
  to: DataTypes.DATE,
});

export class EventInstance extends eventInstance {
  static associate() {
    EventInstance.belongsTo(EventDefinition);
    EventDefinition.hasMany(EventInstance, {
      as: "eventInstances",
      foreignKey: "eventDefinitionId",
    });
  }
}
