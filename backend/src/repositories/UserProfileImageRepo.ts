import sharp from "sharp";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { ImageFileService } from "../libs/file/ImageFileService";
import { SP } from "../libs/serviceProvider/ServiceProvider";
import { UserProfileImage } from "../model/UserProfileImage";
import { FileService } from "../services/FileService";
import { IUserProfileImage } from "../shared/model/IUserProfileImage";
import { UserProfileImageSize } from "../shared/types/UserProfileImageSize";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserProfileImageRepo extends SequelizeRepository<IUserProfileImage> {
  constructor() {
    super(UserProfileImage);
  }

  insert<K extends keyof IUserProfileImage>(
    entity: IEntityDetails<IUserProfileImage>,
    fields: K[]
  ): Promise<IEntitySubset<IUserProfileImage, K>>;
  insert(entity: IEntityDetails<IUserProfileImage>): Promise<IUserProfileImage>;
  async insert(
    entity: IEntityDetails<IUserProfileImage>,
    fields?: unknown
  ): Promise<IUserProfileImage> {
    if (typeof entity.image !== "string") {
      throw new Error("Error while converting");
    }

    // Replace UserProfileImages by new once.
    // Therefore delete the old user profile images of the corresponding user profile
    await this.model.destroy({
      where: { userProfileId: entity.userProfileId },
    });

    // Convert base64 encoded blob image to buffer format
    entity.image = await SP.fetch(FileService).base64BlobToBuffer(entity.image);

    // create and insert thumbnail user profile image
    this.insertThumbnailUserProfileImage(
      entity.userProfileId,
      entity.image,
      entity.mimeType
    );

    // create and insert original user profile image
    if (fields) {
      const insertedEntity = await super.insert(entity, fields as any);
      this.convertImageToBase64Blob(insertedEntity);
      return insertedEntity;
    } else {
      const insertedEntity = await super.insert(entity);
      this.convertImageToBase64Blob(insertedEntity);
      return insertedEntity;
    }
  }

  /**
   * Converts the image of the given {@link userProfileImage} to type base64.
   */
  private async convertImageToBase64Blob(
    userProfileImage: IUserProfileImage
  ): Promise<void> {
    if (!userProfileImage.image) {
      return;
    }

    userProfileImage.image = await SP.fetch(
      ImageFileService
    ).bufferToBase64Blob(
      userProfileImage.image as Buffer,
      userProfileImage.mimeType
    );
  }

  private async insertThumbnailUserProfileImage(
    userProfileId: string,
    image: Buffer,
    mimeType: string
  ): Promise<IUserProfileImage> {
    // convert image to thumbnail size
    const thumbnailImage = await sharp(image).resize(100, 100).toBuffer();

    // insert to database
    return await super.insert({
      image: thumbnailImage,
      mimeType,
      size: UserProfileImageSize.THUMBNAIL,
      userProfileId,
    });
  }
}
