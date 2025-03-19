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

  protected insert(authRoles?: AuthRole[]): void {
    this.router.post(
      `${this.routeMeta.path}`,
      SessionInterceptor(
        async (req, res) => {
          const userProfileImage: IUserProfileImage = req.body;
          debugger;
        },
        [AuthRole.ADMIN]
      )
    );
  }
}
