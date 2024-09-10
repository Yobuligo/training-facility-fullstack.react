import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { UserBankAccount } from "../model/UserBankAccount";
import { UserGrading } from "../model/UserGrading";
import { UserProfile } from "../model/UserProfile";
import { IUserProfile } from "../shared/model/IUserProfile";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";
import { findTransaction } from "./sequelize/utils/findTransaction";
import { transaction } from "./sequelize/utils/transaction";
import { UserGradingRepo } from "./UserGradingRepo";

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
      transaction: findTransaction(),
    });
    return data?.toJSON();
  }

  async update(entity: IUserProfile): Promise<boolean> {
    let wasUpdated = false;
    await transaction(async (transaction) => {
      const [updatedRows] = await UserProfile.update(entity, {
        where: { id: entity.id },
        transaction,
      });

      if (entity.userBankAccount) {
        await UserBankAccount.upsert(entity.userBankAccount, { transaction });
      }

      if (entity.userGradings) {
        // update user profile id
        entity.userGradings.forEach(
          (userGrading) => (userGrading.userProfileId = entity.id)
        );

        const userGradingRepo = new UserGradingRepo();
        await userGradingRepo.synchronize(entity.userGradings, {
          userProfileId: entity.id,
        });
      }
      wasUpdated = updatedRows === 1;
    });
    return wasUpdated;
  }
}
