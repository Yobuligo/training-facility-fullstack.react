import { error } from "../core/utils/error";
import { SystemConfig } from "../model/SystemConfig";
import { ISystemConfig } from "../shared/model/ISystemConfig";

export class SystemConfigRepo {
  async find(): Promise<ISystemConfig> {
    const systemConfig = await SystemConfig.findOne();
    return (
      systemConfig?.toJSON() ??
      error("Error when loading system config. System config does not exist.")
    );
  }

  async upsert(systemConfig: ISystemConfig) {
    SystemConfig.upsert(systemConfig);
  }
}
