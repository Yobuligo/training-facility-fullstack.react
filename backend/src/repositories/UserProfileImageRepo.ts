import sharp from "sharp";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { ImageFileService } from "../libs/file/ImageFileService";
import { ImageType } from "../libs/file/types/ImageType";
import { SP } from "../libs/serviceProvider/ServiceProvider";
import { UserProfileImage } from "../model/UserProfileImage";
import { IUserProfileImage } from "../shared/model/IUserProfileImage";
import { UserProfileImageSize } from "../shared/types/UserProfileImageSize";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserProfileImageRepo extends SequelizeRepository<IUserProfileImage> {
  constructor() {
    super(UserProfileImage);
  }

  async deleteByUserProfileId(userProfileId: string): Promise<boolean> {
    const count = await this.model.destroy({ where: { userProfileId } });
    return count > 0;
  }

  /**
   * Returns all user profile images of the given {@link userProfileId}.
   */
  async findByUserProfileId(
    userProfileId: string
  ): Promise<IUserProfileImage[]> {
    const data = await this.model.findAll({ where: { userProfileId } });
    return data.map((model) => model.toJSON());
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

    // create and insert thumbnail user profile image
    this.insertThumbnailUserProfileImage(
      entity.userProfileId,
      entity.image,
      entity.mimeType
    );

    this.resizeImage(entity);

    // create and insert original user profile image
    if (fields) {
      const insertedEntity = await super.insert(entity, fields as any);
      return insertedEntity;
    } else {
      const insertedEntity = await super.insert(entity);
      return insertedEntity;
    }
  }

  private async insertThumbnailUserProfileImage(
    userProfileId: string,
    image: ImageType,
    mimeType: string
  ): Promise<IUserProfileImage> {
    // convert image to thumbnail size
    const imageBuffer = SP.fetch(ImageFileService).toBuffer(image);
    const thumbnailImage = await sharp(imageBuffer).resize(100, 100).toBuffer();

    // insert to database
    return await super.insert({
      image: thumbnailImage,
      mimeType,
      size: UserProfileImageSize.THUMBNAIL,
      userProfileId,
    });
  }

  /**
   * Resize image of the given {@link userProfileImage} to restrict size.
   */
  private async resizeImage(
    userProfileImage: IEntityDetails<IUserProfileImage>
  ) {
    const imageBuffer = SP.fetch(ImageFileService).toBuffer(
      userProfileImage.image
    );
    userProfileImage.image = await sharp(imageBuffer)
      .resize(1000, 1000)
      .toBuffer();
  }
}
