import { UserRole } from "../model/UserRole";
import { IUserRole } from "../shared/model/IUserRole";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserRoleRepo extends SequelizeRepository<IUserRole> {
  constructor() {
    super(UserRole);
  }
}
