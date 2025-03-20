import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { ImageType } from "../../lib/file/types/ImageType";
import { UserProfileImageSize } from "../types/UserProfileImageSize";

export interface IUserProfileImage extends IEntity {
  mimeType: string;
  image: ImageType;
  size: UserProfileImageSize;
  userProfileId: string;
}

export const UserProfileImageMeta: IRouteMeta = {
  path: "/user-profile-images",
};
