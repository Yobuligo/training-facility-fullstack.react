import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IUserGrading } from "../shared/model/IUserGrading";
import { createIdType } from "./createIdType";
import { UserProfile } from "./UserProfile";

const userGrading: ModelStatic<
  Model<IUserGrading, IEntityDetails<IUserGrading>>
> = db.define("user-gradings", {
  id: createIdType(),
  achievedAt: DataTypes.DATE,
  examiners: DataTypes.STRING,
  grade: DataTypes.INTEGER,
});

export class UserGrading extends userGrading {}

UserGrading.belongsTo(UserProfile);
UserProfile.hasMany(UserGrading, {
  as: "userGradings",
  onDelete: "CASCADE",
  foreignKey: {
    name: "userProfileId",
    allowNull: false,
  },
});
