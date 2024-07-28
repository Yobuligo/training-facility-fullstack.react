import { IUserProfile, UserProfileMeta } from "../shared/model/IUserProfile";
import { Repository } from "./core/Repository";
import { DummyUserProfiles } from "./DummyUserProfiles";

export class UserProfileApi extends Repository<IUserProfile> {
  constructor() {
    super(UserProfileMeta);
  }

  findAll(): Promise<IUserProfile[]> {
    // Todo: replace by productive code
    return new Promise((resolve) => {
      resolve(DummyUserProfiles);
    });
  }

  findByUserId(userId: string): Promise<IUserProfile | undefined> {
    return new Promise((resolve) => {
      const userProfile = DummyUserProfiles.find(
        (userProfile) => userProfile.userId === userId
      );
      resolve(userProfile);
    });
  }
}
