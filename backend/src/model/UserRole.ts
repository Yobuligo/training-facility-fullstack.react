import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IUserRole } from "../shared/model/IUserRole";
import { User } from "./User";

const userRole: ModelStatic<Model<IUserRole, IEntityDetails<IUserRole>>> =
  db.define("user-roles", {
    role: DataTypes.STRING,
  });

export class UserRole extends userRole {}

UserRole.belongsTo(User);
User.hasMany(UserRole, { onDelete: "CASCADE" });
