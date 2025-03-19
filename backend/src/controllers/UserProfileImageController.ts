import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { UserProfileImageRepo } from "../repositories/UserProfileImageRepo";
import {
  IUserProfileImage,
  UserProfileImageMeta,
} from "../shared/model/IUserProfileImage";
import { AuthRole } from "../shared/types/AuthRole";
import { EntityController } from "./core/EntityController";
import { SessionInterceptor } from "./core/SessionInterceptor";

export class UserProfileImageController extends EntityController<
  IUserProfileImage,
  UserProfileImageRepo
> {
  constructor() {
    super(UserProfileImageMeta, new UserProfileImageRepo(), [AuthRole.ADMIN]);
  }

  protected insert(): void {
    this.router.post(
      `${this.routeMeta.path}`,
      SessionInterceptor(
        async (req, res) => {
          const userProfileImage: IUserProfileImage = req.body;
          const createdUserProfileImage = await this.repo.insert(userProfileImage);
          res.status(HttpStatusCode.CREATED_201).send(createdUserProfileImage);
        },
        [AuthRole.ADMIN]
      )
    );
  }
}
