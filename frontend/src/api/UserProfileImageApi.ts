import {
  IUserProfileImage,
  UserProfileImageMeta,
} from "../shared/model/IUserProfileImage";
import { EntityRepository } from "./core/EntityRepository";

export class UserProfileImageApi extends EntityRepository<IUserProfileImage> {
  constructor() {
    super(UserProfileImageMeta);
  }
}
