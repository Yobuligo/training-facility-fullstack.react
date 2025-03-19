import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { ImageFileService } from "../libs/file/ImageFileService";
import { SP } from "../libs/serviceProvider/ServiceProvider";
import { UserProfileImage } from "../model/UserProfileImage";
import { FileService } from "../services/FileService";
import { IUserProfileImage } from "../shared/model/IUserProfileImage";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserProfileImageRepo extends SequelizeRepository<IUserProfileImage> {
  constructor() {
    super(UserProfileImage);
  }

  findById<K extends keyof IUserProfileImage>(
    id: string,
    fields: K[]
  ): Promise<IEntitySubset<IUserProfileImage, K> | undefined>;
  findById(id: string): Promise<IUserProfileImage | undefined>;
  async findById(
    id: string,
    fields?: unknown
  ): Promise<IUserProfileImage | undefined> {
    const data = await this.model.findByPk(
      "badcacfe-c627-4ce8-b665-910d6d50d066"
    );
    const userProfileImage = data?.toJSON();
    if (userProfileImage) {
      this.convertImageToBase64Blob(userProfileImage);
    }
    return userProfileImage;
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

    // Convert base64 encoded blob to buffer
    entity.image = await SP.fetch(FileService).base64BlobToBuffer(entity.image);
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
}
