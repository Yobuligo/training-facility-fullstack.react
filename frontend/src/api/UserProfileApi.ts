import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { FuzzySearch } from "../core/services/fuzzySearch/FuzzySearch";
import { UserRouteMeta } from "../shared/model/IUser";
import { IUserProfile, UserProfileMeta } from "../shared/model/IUserProfile";
import { EntityRepository } from "./core/EntityRepository";
import { RESTApi } from "./core/RESTApi";
import { DummyUserProfiles } from "./DummyUserProfiles";

export class UserProfileApi extends EntityRepository<IUserProfile> {
  constructor() {
    super(UserProfileMeta);
  }

  async findByQuery(query: string): Promise<IUserProfile[]> {
    return new FuzzySearch<IUserProfile>().search(query, DummyUserProfiles);
  }

  findByUserId<K extends keyof IUserProfile>(
    userId: string,
    fields: K[]
  ): Promise<IEntitySubset<IUserProfile, K> | undefined>;
  findByUserId(userId: string): Promise<IUserProfile | undefined>;
  async findByUserId(userId: string, fields?: unknown): Promise<unknown> {
    const requestedFields = this.getFields(fields);
    return await RESTApi.get(
      `${this.host}${UserRouteMeta.path}/${userId}${UserProfileMeta.path}`,
      { fields: requestedFields }
    );
  }
}
