import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IUserRole } from "../shared/model/IUserRole";
import { createIdType } from "./core/createIdType";
import { User } from "./User";

const userRole: ModelStatic<Model<IUserRole, IEntityDetails<IUserRole>>> =
  db.define("user-roles", {
    id: createIdType(),
    role: DataTypes.STRING(20),
  });

export const relHasManyUserRoles = "userRoles";

export class UserRole extends userRole {
  static associate() {
    UserRole.belongsTo(User, { onDelete: "CASCADE" });
    User.hasMany(UserRole, {
      as: relHasManyUserRoles,
      foreignKey: "userId",
    });
  }
}
