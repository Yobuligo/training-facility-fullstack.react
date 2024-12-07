import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IUserGuardian } from "../shared/model/IUserGuardian";
import { createIdType } from "./core/createIdType";
import { UserProfile } from "./UserProfile";

const userGuardian: ModelStatic<
  Model<IUserGuardian, IEntityDetails<IUserGuardian>>
> = db.define("user-guardians", {
  id: createIdType(),
  email: { allowNull: true, type: DataTypes.STRING(255) },
  firstname: { allowNull: true, type: DataTypes.STRING(50) },
  lastname: { allowNull: true, type: DataTypes.STRING(50) },
  phone: { allowNull: true, type: DataTypes.STRING(20) },
});

export class UserGuardian extends userGuardian {
  static associate() {
    UserGuardian.belongsTo(UserProfile, { onDelete: "CASCADE" });
    UserProfile.hasMany(UserGuardian, {
      as: "userGuardians",
      foreignKey: {
        allowNull: false,
        name: "userProfileId",
      },
    });
  }
}
