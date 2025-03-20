import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { ImageFileService } from "../libs/file/ImageFileService";
import { ImageType } from "../libs/file/types/ImageType";
import { SP } from "../libs/serviceProvider/ServiceProvider";
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
    get() {
      // Convert type Buffer to Base64
      const image = this.getDataValue("image");
      return SP.fetch(ImageFileService).toBase64Blob(
        image,
        this.getDataValue("mimeType")
      );
    },
    set(image: ImageType) {
      // Convert type Base64 to Buffer
      const imageBuffer = SP.fetch(ImageFileService).toBuffer(image);
      this.setDataValue("image", imageBuffer);
    },
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
