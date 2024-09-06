import { IUserProfile, UserProfileMeta } from "../shared/model/IUserProfile";
import { EntityRepository } from "./core/EntityRepository";

export class UserProfileApi extends EntityRepository<IUserProfile> {
  constructor() {
    super(UserProfileMeta);
  }
}
