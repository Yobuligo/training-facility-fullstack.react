import { createError } from "../core/utils/createError";
import { UserProfileRepo } from "../repositories/UserProfileRepo";
import { IUserProfile, UserProfileMeta } from "../shared/model/IUserProfile";
import { UserRouteMeta } from "../shared/model/UserRouteMeta";
import { EntityController } from "./core/EntityController";
import { SessionInterceptor } from "./core/SessionInterceptor";

export class UserProfileController extends EntityController<
  IUserProfile,
  UserProfileRepo
> {
  constructor() {
    super(UserProfileMeta, new UserProfileRepo());
    this.findByUserId();
  }

  private findByUserId() {
    this.router.get(
      `${UserRouteMeta.path}/:id${UserProfileMeta.path}`,
      SessionInterceptor(async (req, res) => {
        const fields = this.getFieldsFromQuery(req.query);
        const userProfileRepo = new UserProfileRepo();
        const userProfile = await userProfileRepo.findByUserId(
          req.params.id,
          fields
        );

        if (userProfile) {
          return res.status(200).send(userProfile);
        }
        return res
          .status(404)
          .send(
            createError(
              "Error loading user profile by user id. User profile not found."
            )
          );
      })
    );
  }
}
