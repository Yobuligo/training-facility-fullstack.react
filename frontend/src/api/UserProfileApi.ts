import { IUserProfile, UserProfileMeta } from "../shared/model/IUserProfile";
import { UserProfileImageMeta } from "../shared/model/IUserProfileImage";
import { EntityRepository } from "./core/EntityRepository";
import { RESTApi } from "./core/RESTApi";

export class UserProfileApi extends EntityRepository<IUserProfile> {
  constructor() {
    super(UserProfileMeta);
  }

  /**
   * Deletes all user profile images of the user profile with the given {@link userProfileId}.
   */
  async deleteUserProfileImage(userProfileId: string): Promise<boolean> {
    return await RESTApi.delete(
      `${this.url}/${userProfileId}${UserProfileImageMeta.path}`
    );
  }
}
