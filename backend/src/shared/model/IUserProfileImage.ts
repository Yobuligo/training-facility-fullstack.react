import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { UserProfileImageSize } from "../types/UserProfileImageSize";

export interface IUserProfileImage extends IEntity {
  mimeType: string;
  image: Buffer | string;
  size: UserProfileImageSize;
  userProfileId: string;
}

export const UserProfileImageMeta: IRouteMeta = {
  path: "/user-profile-images",
};
