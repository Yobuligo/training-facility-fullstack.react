import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { ISession } from "../shared/model/ISession";
import { createIdType } from "./core/createIdType";
import { User } from "./User";

const session: ModelStatic<Model<ISession, IEntityDetails<ISession>>> =
  db.define("sessions", {
    id: createIdType(),
    expiresAt: DataTypes.DATE,
  });

export class Session extends session {
  static associate() {
    Session.belongsTo(User);
    User.hasOne(Session, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "CASCADE",
    });
  }
}
