import { Op } from "sequelize";
import { UserRole } from "../model/UserRole";
import { IUserRole } from "../shared/model/IUserRole";
import { AuthRole } from "../shared/types/AuthRole";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserRoleRepo extends SequelizeRepository<IUserRole> {
  constructor() {
    super(UserRole);
  }

  /**
   * Finds all auth roles of the user with the given {@link userId}.
   */
  async findByUserId(userId: string): Promise<AuthRole[]> {
    const data = await this.model.findAll({ where: { userId } });
    const authRoles = data.map((model) => model.toJSON().role);
    return authRoles;
  }

  /**
   * Returns if the user of the given {@link userId}, has at least one of the given {@link authRoles}.
   */
  async hasAuthRole(userId: string, authRoles: AuthRole[]): Promise<boolean> {
    const data = await this.model.findOne({
      where: {
        userId,
        role: {
          [Op.in]: authRoles,
        },
      },
      attributes: ["role"],
    });
    return data ? true : false;
  }
}
