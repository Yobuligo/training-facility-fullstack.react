import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { UserInviteRepo } from "../repositories/UserInviteRepo";
import { IUserInvite, UserInviteRouteMeta } from "../shared/model/IUserInvite";
import { AuthRole } from "../shared/types/AuthRole";
import { EntityController } from "./core/EntityController";

export class UserInviteController extends EntityController<
  IUserInvite,
  UserInviteRepo
> {
  constructor() {
    super(UserInviteRouteMeta, new UserInviteRepo(), [AuthRole.ADMIN]);
    this.check();
  }

  private check() {
    this.router.get(`${this.routeMeta.path}/:id/check`, async (req, res) => {
      const userInviteId = req.params.id;
      const userInviteRepo = new UserInviteRepo();
      await userInviteRepo.check(userInviteId);
      res.send(HttpStatusCode.OK_200).send(true);
    });
  }
}
