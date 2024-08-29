import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IUserProfile } from "../shared/model/IUserProfile";
import { User } from "./User";
import { createIdType } from "./createIdType";

const userProfile: ModelStatic<
  Model<IUserProfile, IEntityDetails<IUserProfile>>
> = db.define("user-profiles", {
  id: createIdType(),
  memberId: DataTypes.STRING(10),
  firstname: DataTypes.STRING(50),
  lastname: DataTypes.STRING(50),
  email: DataTypes.STRING,
  birthday: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  gender: DataTypes.INTEGER,
  city: DataTypes.STRING(50),
  postalCode: DataTypes.STRING(10),
  street: DataTypes.STRING,
  phone: DataTypes.STRING(20),
  tariff: DataTypes.INTEGER,
  joinedOn: DataTypes.DATE,
  isDeactivated: DataTypes.BOOLEAN,
  deactivatedAt: DataTypes.DATE,  
});

export class UserProfile extends userProfile {}

UserProfile.belongsTo(User);
User.hasOne(UserProfile, {
  onDelete: "CASCADE",
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
});
