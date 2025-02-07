import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { createError } from "../core/utils/createError";
import { SystemConfigRepo } from "../repositories/SystemConfigRepo";
import { ISystemConfig, SystemConfigMeta } from "../shared/model/ISystemConfig";
import { AuthRole } from "../shared/types/AuthRole";
import { EntityController } from "./core/EntityController";
import { SessionInterceptor } from "./core/SessionInterceptor";

export class SystemConfigController extends EntityController<
  ISystemConfig,
  SystemConfigRepo
> {
  constructor() {
    super(SystemConfigMeta, new SystemConfigRepo(), [AuthRole.ADMIN]);
    this.findFirst();
  }

  private findFirst() {
    this.router.get(
      `${this.routeMeta.path}/first`,
      SessionInterceptor(async (_, res) => {
        try {
          const systemConfigRepo = new SystemConfigRepo();
          const systemConfig = await systemConfigRepo.find();
          res.status(HttpStatusCode.OK_200).send(systemConfig);
        } catch (error) {
          res
            .status(HttpStatusCode.INTERNAL_SERVER_ERROR_500)
            .send(createError("System config not found", "NotFoundError"));
        }
      })
    );
  }
}
