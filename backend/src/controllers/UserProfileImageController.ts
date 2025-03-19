import { UserProfileImageRepo } from "../repositories/UserProfileImageRepo";
import {
  IUserProfileImage,
  UserProfileImageMeta,
} from "../shared/model/IUserProfileImage";
import { AuthRole } from "../shared/types/AuthRole";
import { EntityController } from "./core/EntityController";

export class UserProfileImageController extends EntityController<
  IUserProfileImage,
  UserProfileImageRepo
> {
  constructor() {
    super(UserProfileImageMeta, new UserProfileImageRepo(), [AuthRole.ADMIN]);
  }
}
