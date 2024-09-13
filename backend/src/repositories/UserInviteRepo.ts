import { UserInvite } from "../model/UserInvite";
import { IUserInvite } from "../shared/model/IUserInvite";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserInviteRepo extends SequelizeRepository<IUserInvite> {
  constructor() {
    super(UserInvite);
  }
}
