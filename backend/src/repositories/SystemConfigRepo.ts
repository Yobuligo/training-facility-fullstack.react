import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { error } from "../core/utils/error";
import { ISystemConfig } from "../shared/model/ISystemConfig";
import { SystemConfig } from "./../model/SystemConfig";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class SystemConfigRepo extends SequelizeRepository<ISystemConfig> {
  constructor() {
    super(SystemConfig);
  }

  /**
   * Returns the first system config or undefined if not found.
   */
  async findFirstOrNull(): Promise<ISystemConfig | undefined> {
    const model = await SystemConfig.findOne();
    return model?.toJSON();
  }

  /**
   * Returns the first system config or throws an error if not found
   */
  async findFirst(): Promise<ISystemConfig> {
    const systemConfig = await this.findFirstOrNull();
    return (
      systemConfig ??
      error("Error while loading system config. System config does not exist.")
    );
  }

  /**
   * Inserts the given {@link systemConfig}.
   */
  async insert(
    systemConfig: IEntityDetails<ISystemConfig>
  ): Promise<ISystemConfig> {
    const model = await SystemConfig.create(systemConfig);
    return model.toJSON();
  }
}
