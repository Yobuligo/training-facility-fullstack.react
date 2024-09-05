import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { NotImplementedError } from "../core/errors/NotImplementedError";
import { UserRouteMeta } from "../shared/model/IUser";
import { IUserProfile, UserProfileMeta } from "../shared/model/IUserProfile";
import { EntityRepository } from "./core/EntityRepository";
import { RESTApi } from "./core/RESTApi";

export class UserProfileApi extends EntityRepository<IUserProfile> {
  constructor() {
    super(UserProfileMeta);
  }

  async findByQuery(query: string): Promise<IUserProfile[]> {
    throw new NotImplementedError();
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
