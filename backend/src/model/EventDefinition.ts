import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IEventDefinition } from "../shared/model/IEventDefinition";
import { createIdType } from "./createIdType";
import { User } from "./User";

const eventDefinition: ModelStatic<
  Model<IEventDefinition, IEntityDetails<IEventDefinition>>
> = db.define("event-definitions", {
  id: createIdType(),
  color: {
    type: DataTypes.STRING(10),
  },
  creatorUserId: DataTypes.UUID,
  description: DataTypes.STRING(100),
  from: DataTypes.DATE,
  recurrence: DataTypes.INTEGER,
  title: DataTypes.STRING(100),
  to: DataTypes.DATE,
});

export class EventDefinition extends eventDefinition {}

EventDefinition.belongsTo(User, { foreignKey: "creatorUserId" });
