import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { ISession } from "../shared/model/ISession";
import { createIdType } from "./createIdType";
import { User } from "./User";

export const Session: ModelStatic<Model<ISession, IEntityDetails<ISession>>> =
  db.define("sessions", {
    id: createIdType(),
    expiresAt: DataTypes.DATE,
  });

Session.belongsTo(User);
User.hasOne(Session, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
