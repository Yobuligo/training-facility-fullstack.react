import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { UserBankAccount } from "../model/UserBankAccount";
import { UserGrading } from "../model/UserGrading";
import { UserProfile } from "../model/UserProfile";
import { UserRole } from "../model/UserRole";
import { IUserProfile } from "../shared/model/IUserProfile";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserProfileRepo extends SequelizeRepository<IUserProfile> {
  constructor() {
    super(UserProfile, [UserBankAccount, UserGrading, UserRole]);
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
      include: [UserRole],
    });
    return data?.toJSON();
  }
}
