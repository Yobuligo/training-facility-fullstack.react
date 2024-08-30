import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { NotImplementedError } from "../core/errors/NotImplementedError";
import { UserBankAccount } from "../model/UserBankAccount";
import { UserGrading } from "../model/UserGrading";
import { UserProfile } from "../model/UserProfile";
import { UserRole } from "../model/UserRole";
import { IUserProfile } from "../shared/model/IUserProfile";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserProfileRepo extends SequelizeRepository<IUserProfile> {
  constructor() {
    super(UserProfile, [{ model: UserBankAccount }, { model: UserGrading }]);
  }

  findByUserId<K extends keyof IUserProfile>(
    userId: string,
    fields: K[]
  ): Promise<IEntitySubset<IUserProfile, K> | undefined>;
  findByUserId(userId: string): Promise<IUserProfile | undefined>;
  async findByUserId(userId: string, fields?: unknown): Promise<unknown> {
    const requestedFields = this.getKeyFields(fields);
    const data = await this.model.findOne({
      where: { userId },
      // attributes: requestedFields ? requestedFields : undefined,
      // Todo
      include: [{ model: UserRole, as: "userRoles" }],
    });
    throw new NotImplementedError()
    return data?.toJSON();
  }
}
