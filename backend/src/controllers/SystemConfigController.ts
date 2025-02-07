import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { SystemConfigRepo } from "../repositories/SystemConfigRepo";
import {
  ISystemConfig,
  SystemConfigRouteMeta,
} from "../shared/model/ISystemConfig";
import { AuthRole } from "../shared/types/AuthRole";
import { EntityController } from "./core/EntityController";
import { SessionInterceptor } from "./core/SessionInterceptor";

export class SystemConfigController extends EntityController<
  ISystemConfig,
  SystemConfigRepo
> {
  constructor() {
    super(SystemConfigRouteMeta, new SystemConfigRepo(), [AuthRole.ADMIN]);
  }

  protected findAll(authRoles?: AuthRole[]): void {
    this.router.get(
      `${this.routeMeta.path}`,
      SessionInterceptor(async (req, res) => {
        const systemConfigRepo = new SystemConfigRepo();
        const first = req.query.first === "true" ? true : false;
        if (first === true) {
          const systemConfig = await systemConfigRepo.findFirst();
          res.status(HttpStatusCode.OK_200).send(systemConfig);
        } else {
          const systemConfigs = await systemConfigRepo.findAll();
          res.status(HttpStatusCode.OK_200).send(systemConfigs);
        }
      }, authRoles)
    );
  }
}
