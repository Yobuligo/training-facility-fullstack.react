import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IUserGrading } from "../shared/model/IUserGrading";
import { User } from "./User";

const userGrading: ModelStatic<
  Model<IUserGrading, IEntityDetails<IUserGrading>>
> = db.define("user-gradings", {
  achievedAt: DataTypes.DATE,
  examiners: DataTypes.STRING,
  grade: DataTypes.INTEGER,
});

export class UserGrading extends userGrading {}

UserGrading.belongsTo(User);
User.hasMany(UserGrading, {
  onDelete: "CASCADE",
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});
