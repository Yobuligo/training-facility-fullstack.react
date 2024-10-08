import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { createError } from "../core/utils/createError";
import { UserProfileRepo } from "../repositories/UserProfileRepo";
import { UserRouteMeta } from "../shared/model/IUser";
import { IUserProfile, UserProfileMeta } from "../shared/model/IUserProfile";
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
}
