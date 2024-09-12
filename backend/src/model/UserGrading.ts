import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IUserGrading } from "../shared/model/IUserGrading";
import { createIdType } from "./core/createIdType";
import { SequelizeModel } from "./core/SequelizeModel";
import { UserProfile } from "./UserProfile";

const userGrading: ModelStatic<
  Model<IUserGrading, IEntityDetails<IUserGrading>>
> = db.define("user-gradings", {
  id: createIdType(),
  achievedAt: DataTypes.DATE,
  examiners: DataTypes.STRING,
  grade: DataTypes.INTEGER,
});

export class UserGrading extends SequelizeModel(userGrading, () => {
  UserGrading.belongsTo(UserProfile, { onDelete: "CASCADE" });
  UserProfile.hasMany(UserGrading, {
    as: "userGradings",
    foreignKey: {
      name: "userProfileId",
      allowNull: false,
    },
  });
}) {}
