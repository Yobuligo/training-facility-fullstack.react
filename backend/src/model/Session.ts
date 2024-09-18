import { DataTypes, Model, ModelStatic } from "sequelize";
import { db } from "../db/db";
import { ISession } from "./types/ISession";
import { User } from "./User";

const session: ModelStatic<Model<ISession, ISession>> = db.define("sessions", {
  sid: {
    primaryKey: true,
    type: DataTypes.STRING,
  },
  expires: DataTypes.DATE,
  data: {
    type: DataTypes.TEXT,
  },
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
