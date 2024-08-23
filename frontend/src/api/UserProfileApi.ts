import { FuzzySearch } from "../core/services/fuzzySearch/FuzzySearch";
import { IUserProfile, UserProfileMeta } from "../shared/model/IUserProfile";
import { Repository } from "./core/Repository";
import { DummyUserProfiles } from "./DummyUserProfiles";
import { GradingApi } from "./GradingApi";

export class UserProfileApi extends Repository<IUserProfile> {
  constructor() {
    super(UserProfileMeta);
  }

  insert(data: IUserProfile): Promise<IUserProfile> {
    // Todo: replace by productive code
    return new Promise((resolve) => {
      DummyUserProfiles.push(data);
      resolve(data);
    });
  }

  update(data: IUserProfile): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  findAll(): Promise<IUserProfile[]> {
    // Todo: replace by productive code
    return new Promise(async (resolve) => {
      const gradingApi = new GradingApi();
      await DummyUserProfiles.map(async (userProfile) => {
        const gradings = await gradingApi.findByUserId(userProfile.userId);
        userProfile.gradings = gradings;
      });
      resolve(DummyUserProfiles);
    });
  }

  async findByQuery(query: string): Promise<IUserProfile[]> {
    return new FuzzySearch<IUserProfile>().search(query, DummyUserProfiles);
  }

  findByUserId(userId: string): Promise<IUserProfile | undefined> {
    return new Promise(async (resolve) => {
      const userProfile = DummyUserProfiles.find(
        (userProfile) => userProfile.userId === userId
      );
      if (userProfile) {
        const gradingApi = new GradingApi();
        const gradings = await gradingApi.findByUserId(userId);
        userProfile.gradings = gradings;
      }
      resolve(userProfile);
    });
  }
}
