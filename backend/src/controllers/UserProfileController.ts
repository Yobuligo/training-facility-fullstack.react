import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { createError } from "../core/utils/createError";
import { UserProfileImageRepo } from "../repositories/UserProfileImageRepo";
import { UserProfileRepo } from "../repositories/UserProfileRepo";
import { UserRouteMeta } from "../shared/model/IUser";
import { IUserProfile, UserProfileMeta } from "../shared/model/IUserProfile";
import { UserProfileImageMeta } from "../shared/model/IUserProfileImage";
import { AuthRole } from "../shared/types/AuthRole";
import { EntityController } from "./core/EntityController";
import { SessionInterceptor } from "./core/SessionInterceptor";

export class UserProfileController extends EntityController<
  IUserProfile,
  UserProfileRepo
> {
  constructor() {
    super(UserProfileMeta, new UserProfileRepo(), [AuthRole.ADMIN]);
    this.findByUserId();
    this.deleteUserProfileImages();
  }

  private findByUserId() {
    this.router.get(
      `${UserRouteMeta.path}/:id${UserProfileMeta.path}`,
      SessionInterceptor(async (req, res) => {
        const fields = this.getFieldsFromQuery(req.query);
        const userId = req.params.id;

        if (!req.sessionInfo.isAdminOrYourself(userId)) {
          return this.sendMissingAuthorityError(res);
        }

        const userProfileRepo = new UserProfileRepo();
        const userProfile = await userProfileRepo.findByUserId(userId, fields);

        if (userProfile) {
          return res.status(HttpStatusCode.OK_200).send(userProfile);
        }
        return res
          .status(HttpStatusCode.NOT_FOUND_404)
          .send(
            createError(
              "Error loading user profile by user id. User profile not found."
            )
          );
      })
    );
  }

  private deleteUserProfileImages() {
    this.router.delete(
      `${this.routeMeta.path}/:id${UserProfileImageMeta.path}`,
      SessionInterceptor(
        async (req, res) => {
          const userProfileId = req.params.id;
          const userProfileImageRepo = new UserProfileImageRepo();
          const success = await userProfileImageRepo.deleteByUserProfileId(
            userProfileId
          );
          if (success) {
            res.status(HttpStatusCode.OK_200).send(true);
          } else {
            res.status(HttpStatusCode.NO_CONTENT_204).send(false);
          }
        },
        [AuthRole.ADMIN]
      )
    );
  }
}
