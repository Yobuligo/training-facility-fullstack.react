import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { ISession } from "../shared/model/ISession";

export const Session: ModelStatic<Model<ISession, IEntityDetails<ISession>>> =
  db.define("sessions", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    expiresAt: DataTypes.DATE,
    userId: DataTypes.STRING,
    username: DataTypes.STRING,
  });
