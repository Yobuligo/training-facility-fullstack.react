import { ImageFileService } from "../lib/file/ImageFileService";
import { SP } from "../lib/serviceProvider/ServiceProvider";
import {
  IUserProfileImage,
  UserProfileImageMeta,
} from "../shared/model/IUserProfileImage";
import { UserProfileImageSize } from "../shared/types/UserProfileImageSize";
import { EntityRepository } from "./core/EntityRepository";

export class UserProfileImageApi extends EntityRepository<IUserProfileImage> {
  constructor() {
    super(UserProfileImageMeta);
  }

  /**
   * Inserts a user profile image from the given {@link blob} and assigns it to the given {@link userProfileId}.
   */
  async insertFromBlob(
    userProfileId: string,
    blob: Blob
  ): Promise<IUserProfileImage> {
    const base64Image = await SP.fetch(ImageFileService).blobToBase64(blob);
    return await this.insert({
      image: base64Image,
      mimeType: blob.type,
      size: UserProfileImageSize.ORIGINAL,
      userProfileId,
    });
  }
}
