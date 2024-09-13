import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { UserInviteRepo } from "../repositories/UserInviteRepo";
import { IUserInvite, UserInviteRouteMeta } from "../shared/model/IUserInvite";
import { AuthRole } from "../shared/types/AuthRole";
import { EntityController } from "./core/EntityController";
import { ErrorInterceptor } from "./core/ErrorInterceptor";

export class UserInviteController extends EntityController<
  IUserInvite,
  UserInviteRepo
> {
  constructor() {
    super(UserInviteRouteMeta, new UserInviteRepo(), [AuthRole.ADMIN]);
    this.verify();
  }

  private verify() {
    this.router.get(
      `${this.routeMeta.path}/:id/verify`,
      ErrorInterceptor(async (req, res) => {
        const userInviteId = req.params.id;
        const userInviteRepo = new UserInviteRepo();
        const userInvite = await userInviteRepo.verify(userInviteId);
        res.send(HttpStatusCode.OK_200).send(userInvite);
      })
    );
  }
}
