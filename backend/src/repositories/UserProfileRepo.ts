import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { IEntityWithUserProfileId } from "../model/types/IEntityWithUserProfileId";
import { UserBankAccount } from "../model/UserBankAccount";
import { UserContactOptions } from "../model/UserContactOptions";
import { UserGrading } from "../model/UserGrading";
import { UserGuardian } from "../model/UserGuardian";
import { UserProfile } from "../model/UserProfile";
import { IUserProfile } from "../shared/model/IUserProfile";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";
import { findTransaction } from "./sequelize/utils/findTransaction";
import { transaction } from "./sequelize/utils/transaction";
import { UserGradingRepo } from "./UserGradingRepo";
import { UserGuardianRepo } from "./UserGuardianRepo";

export class UserProfileRepo extends SequelizeRepository<IUserProfile> {
  constructor() {
    super(UserProfile, [
      { model: UserBankAccount, as: "userBankAccount" },
      { model: UserContactOptions, as: "userContactOptions" },
      { model: UserGrading, as: "userGradings" },
      { model: UserGuardian, as: "userGuardians" },
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

      if (entity.userContactOptions) {
        await UserContactOptions.upsert(entity.userContactOptions, {
          transaction,
        });
      }

      await this.updateUserGradings(entity);
      await this.updateUserGuardians(entity);

      wasUpdated = updatedRows === 1;
    });
    return wasUpdated;
  }

  async updateLastInvitedAtByUserId(
    userId: string,
    lastInvitedAt: Date
  ): Promise<boolean> {
    const userProfile = await this.findByUserId(userId, ["id"]);
    if (!userProfile) {
      return false;
    }

    await this.model.update(
      { lastInvitedAt: lastInvitedAt },
      { where: { id: userProfile.id } }
    );

    return true;
  }

  private async updateUserGradings(entity: IUserProfile) {
    if (entity.userGradings) {
      this.updateUserProfileId(entity.userGradings, entity.id);
      const userGradingRepo = new UserGradingRepo();
      await userGradingRepo.synchronize(entity.userGradings, {
        userProfileId: entity.id,
      });
    }
  }

  private async updateUserGuardians(entity: IUserProfile) {
    if (entity.userGuardians) {
      this.updateUserProfileId(entity.userGuardians, entity.id);
      const userGuardianRepo = new UserGuardianRepo();
      await userGuardianRepo.synchronize(entity.userGuardians, {
        userProfileId: entity.id,
      });
    }
  }

  private updateUserProfileId(
    entities: IEntityWithUserProfileId[],
    userProfileId: string
  ) {
    entities.forEach((entity) => (entity.userProfileId = userProfileId));
  }
}
