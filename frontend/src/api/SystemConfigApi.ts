import {
  ISystemConfig,
  SystemConfigMeta as SystemConfigRouteMeta,
} from "../shared/model/ISystemConfig";
import { EntityRepository } from "./core/EntityRepository";
import { RESTApi } from "./core/RESTApi";

export class SystemConfigApi extends EntityRepository<ISystemConfig> {
  constructor() {
    super(SystemConfigRouteMeta);
  }

  /**
   * Returns the first system config.
   */
  async findFirst(): Promise<ISystemConfig> {
    return await RESTApi.get(`${this.url}`, { urlParams: { first: "true" } });
  }
}
