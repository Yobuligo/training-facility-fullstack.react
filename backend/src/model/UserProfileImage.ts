import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IUserProfileImage } from "../shared/model/IUserProfileImage";
import { createIdType } from "./core/createIdType";
import { UserProfile } from "./UserProfile";

const userProfileImage: ModelStatic<
  Model<IUserProfileImage, IEntityDetails<IUserProfileImage>>
> = db.define("user-profile-images", {
  id: createIdType(),
  mimeType: {
    allowNull: false,
    type: DataTypes.STRING(32),
  },
  image: {
    allowNull: false,
    type: DataTypes.BLOB("long"),
  },
  size: DataTypes.INTEGER,
});

export class UserProfileImage extends userProfileImage {
  static associate() {
    UserProfileImage.belongsTo(UserProfile, { onDelete: "CASCADE" });
    UserProfile.hasMany(UserProfileImage, {
      as: "userProfileImages",
      foreignKey: "userProfileId",
    });
  }
}
