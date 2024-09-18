import { DataTypes, Model, ModelStatic } from "sequelize";
import { db } from "../db/db";
import { ISession } from "./types/ISession";
import { User } from "./User";

const session: ModelStatic<Model<ISession, ISession>> = db.define("sessions", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
  },
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
