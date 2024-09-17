import { DataTypes, Model, ModelStatic } from "sequelize";
import { db } from "../db/db";
import { IUserLoginAttempt } from "./types/IUserLoginAttempt";
import { User } from "./User";

const userLoginAttempt: ModelStatic<
  Model<IUserLoginAttempt, IUserLoginAttempt>
> = db.define("user-login-attempts", {
  lastFailAttempt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  numberFailAttempts: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

export class UserLoginAttempt extends userLoginAttempt {
  static associate() {
    UserLoginAttempt.belongsTo(User, { onDelete: "CASCADE" });
  }
}
