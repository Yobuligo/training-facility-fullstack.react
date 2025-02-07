import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { SystemConfigRepo } from "../repositories/SystemConfigRepo";
import { ISystemConfig } from "../shared/model/ISystemConfig";

/**
 * Initial creation of the system config
 */
export const createSystemConfig = async () => {
  // check if system config already exists
  const systemConfigRepo = new SystemConfigRepo();
  if (await systemConfigRepo.findFirstOrNull()) {
    return;
  }

  // Create initial version of system config
  const systemConfig: IEntityDetails<ISystemConfig> = {
    whatsAppURLCommunity: "",
    whatsAppURLKids: "",
    whatsAppURLNews: "",
  };

  await systemConfigRepo.insert(systemConfig);
};
