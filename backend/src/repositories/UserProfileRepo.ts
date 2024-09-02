import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { db } from "../db/db";
import { UserBankAccount } from "../model/UserBankAccount";
import { UserGrading } from "../model/UserGrading";
import { UserProfile } from "../model/UserProfile";
import { IUserProfile } from "../shared/model/IUserProfile";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class UserProfileRepo extends SequelizeRepository<IUserProfile> {
  constructor() {
    super(UserProfile, [
      { model: UserBankAccount, as: "userBankAccount" },
      { model: UserGrading, as: "userGradings" },
    ]);
  }

  findByUserId<K extends keyof IUserProfile>(
    userId: string,
    fields: K[]
  ): Promise<IEntitySubset<IUserProfile, K> | undefined>;
  findByUserId(userId: string): Promise<IUserProfile | undefined>;
  async findByUserId(userId: string, fields?: unknown): Promise<unknown> {
    const attributes = this.getAttributes(fields);
    const includes = this.getIncludes(fields);
    const data = await this.model.findOne({
      where: { userId },
      attributes: attributes,
      include: includes,
    });
    return data?.toJSON();
  }

  async update(entity: IUserProfile): Promise<boolean> {
    const transaction = await db.transaction();
    try {
      const [updatedRows] = await UserProfile.update(entity, {
        where: { id: entity.id },
        transaction,
      });

      if (entity.userBankAccount) {
        await UserBankAccount.upsert(entity.userBankAccount, { transaction });
      }
      transaction.commit();
      return updatedRows === 1;
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }
}
