import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { UserProfileImageRepo } from "../repositories/UserProfileImageRepo";
import { UserRepo } from "../repositories/UserRepo";
import { UserProfileMeta } from "../shared/model/IUserProfile";
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
    this.loadByUserProfileId();
  }

  protected insert(): void {
    this.router.post(
      `${this.routeMeta.path}`,
      SessionInterceptor(
        async (req, res) => {
          const userProfileImage: IUserProfileImage = req.body;
          const createdUserProfileImage = await this.repo.insert(
            userProfileImage
          );
          res.status(HttpStatusCode.CREATED_201).send(createdUserProfileImage);
        },
        [AuthRole.ADMIN]
      )
    );
  }

  /**
   * Loads user profiles images by the corresponding user profile id.
   */
  private loadByUserProfileId() {
    this.router.get(
      `${UserProfileMeta.path}/:id${this.routeMeta.path}`,
      SessionInterceptor(async (req, res) => {
        const userProfileId = req.params.id;

        const userRepo = new UserRepo();
        const requestedUserId = await userRepo.findUserIdByUserProfileId(
          userProfileId
        );
        if (!requestedUserId) {
          return this.sendMissingAuthorityError(res);
        }

        if (!(await this.checkIsAdminOrYourself(req, res, requestedUserId))) {
          return;
        }

        const userProfileImageRepo = new UserProfileImageRepo();
        const userProfileImages =
          await userProfileImageRepo.findByUserProfileId(userProfileId);
        res.status(HttpStatusCode.OK_200).send(userProfileImages);
      }, [])
    );
  }
}
