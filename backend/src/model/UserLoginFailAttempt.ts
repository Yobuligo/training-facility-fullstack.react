import { DataTypes, Model, ModelStatic } from "sequelize";
import { db } from "../db/db";
import { IUserLoginFailAttempt } from "./types/IUserLoginFailAttempt";
import { User } from "./User";

const userLoginFailAttempt: ModelStatic<
  Model<IUserLoginFailAttempt, IUserLoginFailAttempt>
> = db.define("user-login-fail-attempts", {
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  lastFailAttempt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  lockedUntil: DataTypes.DATE,
  numberFailAttempts: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

export class UserLoginFailAttempt extends userLoginFailAttempt {
  static associate() {
    UserLoginFailAttempt.belongsTo(User, { onDelete: "CASCADE" });
    User.hasOne(UserLoginFailAttempt, {
      as: "userLoginFailAttempt",
      foreignKey: "userId",
    });
  }
}
