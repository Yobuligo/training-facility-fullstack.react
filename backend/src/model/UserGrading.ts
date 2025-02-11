import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IUserGrading } from "../shared/model/IUserGrading";
import { createIdType } from "./core/createIdType";
import { UserProfile } from "./UserProfile";

const userGrading: ModelStatic<
  Model<IUserGrading, IEntityDetails<IUserGrading>>
> = db.define("user-gradings", {
  id: createIdType(),
  achievedAt: DataTypes.DATE,
  examiners: DataTypes.STRING,
  grade: DataTypes.INTEGER,
  kickTechnique: DataTypes.INTEGER,
  place: DataTypes.STRING(50),
});

export class UserGrading extends userGrading {
  static associate() {
    UserGrading.belongsTo(UserProfile, { onDelete: "CASCADE" });
    UserProfile.hasMany(UserGrading, {
      as: "userGradings",
      foreignKey: {
        name: "userProfileId",
        allowNull: false,
      },
    });
  }
}
