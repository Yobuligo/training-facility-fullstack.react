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
  }
}
