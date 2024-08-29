import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IUserRole } from "../shared/model/IUserRole";
import { User } from "./User";
import { createIdType } from "./createIdType";
import { UserProfile } from "./UserProfile";

const userRole: ModelStatic<Model<IUserRole, IEntityDetails<IUserRole>>> =
  db.define("user-roles", {
    id: createIdType(),
    role: DataTypes.STRING(20),
  });

export class UserRole extends userRole {}

UserRole.belongsTo(UserProfile);
UserProfile.hasMany(UserRole, {
  onDelete: "CASCADE",
  foreignKey: {
    name: "userProfileId",
    allowNull: false,
  },
});
