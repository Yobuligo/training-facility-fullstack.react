import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IUserInvite } from "../shared/model/IUserInvite";
import { createIdType } from "./core/createIdType";
import { User } from "./User";

const userInvite: ModelStatic<Model<IUserInvite, IEntityDetails<IUserInvite>>> =
  db.define("user-invites", {
    id: createIdType(),
    expiresAt: DataTypes.DATE,
    type: DataTypes.INTEGER,
  });

export class UserInvite extends userInvite {
  static associate() {
    UserInvite.belongsTo(User, { onDelete: "CASCADE" });
    User.hasMany(UserInvite, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
    });
  }
}
