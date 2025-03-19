import { UserProfileImage } from "../model/UserProfileImage";
import { IUserProfileImage } from "../shared/model/IUserProfileImage";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserProfileImageRepo extends SequelizeRepository<IUserProfileImage> {
  constructor() {
    super(UserProfileImage);
  }
}
