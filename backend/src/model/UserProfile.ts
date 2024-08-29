import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IUserProfile } from "../shared/model/IUserProfile";
import { User } from "./User";

const userProfile: ModelStatic<
  Model<IUserProfile, IEntityDetails<IUserProfile>>
> = db.define("user-profiles", {
  birthday: {
    allowNull: true,
    type: DataTypes.DATE,
  },
});

export class UserProfile extends userProfile {}

UserProfile.belongsTo(User);
User.hasOne(UserProfile);
